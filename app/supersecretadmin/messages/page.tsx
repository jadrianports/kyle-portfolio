"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, Eye, EyeOff, Calendar, User, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
//import { AdminSkeleton } from "@/components/admin/AdminSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/**
 * Messages Editor - View and Manage Contact Form Submissions
 * 
 * Features:
 * - View all messages from contact form
 * - Mark as read/unread
 * - Delete messages
 * - Filter by read/unread status
 * - Shows sender info, subject, date
 * 
 * Backend Integration:
 * - Replace localStorage with API calls
 * - Add pagination for large message lists
 * - Add email reply functionality
 */

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export default function MessagesEditor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();

 useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/contact");
        const json = await res.json();
        if (json.data) setMessages(json.data);
      } catch (err) {
        console.error("Error fetching Messages:", err);
        toast({ title: "⚠️ Failed to fetch Messages" });
      }
      setLoading(false);
    };
    fetchMessages();
  }, []);

  /** Handle mark read/unread or delete */
  const handleManageMessage = async (id: string, action: "delete" | "mark_read" | "mark_unread") => {
    try {
      const res = await fetch("/api/contact/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      console.log("Manage message response:", res);
      console.log("Request body:", { id, action });
      console.log("Response status:", res.status);
      console.log("Response status text:", res.statusText);
      console.log("Response headers:", res.headers);
      console.log("Response body:", await res.clone().text());
      const data = await res.json();
      if (res.ok) {
        toast({ title: data.message });
        if (action === "delete") setSelectedMessage(null);
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === "unread") return !msg.isRead;
    if (filter === "read") return msg.isRead;
    return true;
  });

//   if (loading) {
//     return (
//       <AdminLayout>
//         <AdminSkeleton type="list" />
//       </AdminLayout>
//     );
//   }

  return (
      <div className="min-h-screen p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-rose via-hot-pink to-neon-pink bg-clip-text text-transparent">
                Messages
              </h1>
              <p className="text-muted-foreground mt-2">
                View and manage contact form submissions
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {messages.filter(m => !m.isRead).length} Unread
            </Badge>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
            >
              All ({messages.length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              size="sm"
            >
              Unread ({messages.filter(m => !m.isRead).length})
            </Button>
            <Button
              variant={filter === "read" ? "default" : "outline"}
              onClick={() => setFilter("read")}
              size="sm"
            >
              Read ({messages.filter(m => m.isRead).length})
            </Button>
          </div>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <Card className="p-12 text-center">
            <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground">
              Messages from the contact form will appear here
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                    !msg.isRead
                      ? "border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent"
                      : "hover:border-primary/20"
                  }`}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.isRead) {
                      handleManageMessage(msg.id, "mark_read");
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose to-hot-pink flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {msg.name}
                            </h3>
                            {!msg.isRead && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {msg.email}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          {msg.subject}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {msg.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(msg.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {msg.message.length} characters
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleManageMessage(msg.id, msg.isRead ? "mark_unread" : "mark_read");
                        }}
                      >
                        {msg.isRead ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleManageMessage(msg.id, msg.isRead ? "mark_unread" : "mark_read");
                        }}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Message Detail Dialog */}
      {selectedMessage && (
        <AlertDialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose to-hot-pink flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <AlertDialogTitle className="text-xl">{selectedMessage.name}</AlertDialogTitle>
                  <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(selectedMessage.date).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">{selectedMessage.subject}</h4>
                <AlertDialogDescription className="text-foreground whitespace-pre-wrap">
                  {selectedMessage.message}
                </AlertDialogDescription>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => { deleteId && handleManageMessage(deleteId, "delete")}}

                className="bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The message will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleManageMessage(deleteId , "delete")}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
  );
}