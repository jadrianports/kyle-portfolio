"use client";

import { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ServiceFormDialog, ServiceFormData } from "@/admincomponents/dialog/ServiceFormDialog";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export default function ServicesEditor() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Fetch services via API route
  const fetchServices = async () => {
    try {
      const res = await fetch("/api/service");
      const json = await res.json();
      if (res.ok) setServices(json.data);
      else throw json.error;
    } catch (err: any) {
      console.error("Error fetching services:", err);
      toast({ title: "⚠️ Failed to fetch services", description: err.message });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = () => {
    setEditingService(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleSave = async (formData: ServiceFormData) => {
    try {
      if (editingService) {
        // Update
        const res = await fetch("/api/service/update", {
          method: "POST",
          body: JSON.stringify({ id: editingService.id, ...formData }),
        });
        const json = await res.json();
        if (!res.ok) throw json.error;

        setServices(services.map(s => s.id === editingService.id ? { ...s, ...formData } : s));
        toast({ title: "✨ Service updated!" });
      } else {
        // Create
        const res = await fetch("/api/service/create", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok) throw json.error;

        setServices([json.data, ...services]);
        toast({ title: "✨ Service added!" });
      }
    } catch (err: any) {
      console.error("Error saving service:", err);
      toast({ title: "⚠️ Failed to save", description: err.message });
    } finally {
      setIsDialogOpen(false);
      setEditingService(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      const res = await fetch("/api/service/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) throw json.error;

      setServices(services.filter(s => s.id !== id));
      toast({ title: "Service deleted" });
    } catch (err: any) {
      console.error("Error deleting service:", err);
      toast({ title: "⚠️ Failed to delete", description: err.message });
    }
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Services</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>
        </div>

        {/* Drag & Drop List */}
        <Reorder.Group axis="y" values={services} onReorder={setServices} className="space-y-4">
          {services.map((service) => (
            <Reorder.Item key={service.id} value={service}>
              <motion.div whileHover={{ scale: 1.01 }} className="cursor-move">
                <Card className="hover:shadow-lg transition-all border-primary/20">
                  <CardHeader className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <GripVertical className="w-6 h-6 text-muted-foreground" />
                      <div>
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {service.deliverables.map((d, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800">
                              {d}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </motion.div>

      {/* Service Form Dialog */}
      <ServiceFormDialog
        isOpen={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); setEditingService(null); }}
        onSave={handleSave}
        initialData={editingService ? {
          title: editingService.title,
          description: editingService.description,
          icon: editingService.icon,
          deliverables: editingService.deliverables || [],
        } : undefined}
      />
    </div>
  );
}
