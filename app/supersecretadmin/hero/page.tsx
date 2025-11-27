"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import RichTextEditor from "@/admincomponents/RichTextEditor";
import { AdminSkeleton } from "@/admincomponents/AdminSkeleton";
import { useLoading } from "@/contexts/LoadingContext";
import { getPortfolioData } from "@/lib/getPortfolioData";
import type { HeroData as HeroDataType } from "@/lib/getPortfolioData";

const supabase = createClient();

export default function HeroEditor() {
  const { toast } = useToast();
  const { isLoading, setIsLoading, setLoadingText } = useLoading();
  const [isSaving, setIsSaving] = useState(false);

  // Use nullable HeroData type, initialize to null until fetched
const [heroData, setHeroData] = useState<Partial<HeroDataType>>({});

  // Skills is just a local editable array (kept in sync with heroData.skills on load)
  const [skills, setSkills] = useState<string[]>([]);

  // social links kept separately for easier two-way editing UI (merged on save)
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({
    instagram: "",
    linkedin: "",
    facebook: "",
    youtube: "",
  });

  // Fetch hero data once
  useEffect(() => {
    const fetchHero = async () => {
      try {
        setIsLoading(true);
        setLoadingText?.("Loading hero...");
        const portfolio = await getPortfolioData();
        const h = portfolio.hero ?? {};

        setHeroData(h);
        setSkills(Array.isArray(h.skills) ? h.skills : h.skills ? [h.skills] : []);
        setSocialLinks(h.social_links ?? { instagram: "", linkedin: "", facebook: "", youtube: "" });
      } catch (err: any) {
        console.error("Error fetching hero:", err);
        toast({ title: "⚠️ Failed to fetch hero", description: err?.message || String(err) });
      } finally {
        setIsLoading(false);
        setLoadingText?.(undefined);
      }
    };

    fetchHero();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <AdminSkeleton type="editor" />; // skeleton loader while fetching
  }
  // Helper to update nested heroData safely
  const patchHero = (patch: Partial<HeroDataType>) => {
    setHeroData((prev) => ({ ...(prev ?? {}), ...patch }));
  };

  // Skills helpers
  const addSkill = () => setSkills((s) => [...s, ""]);
  const removeSkill = (index: number) => setSkills((s) => s.filter((_, i) => i !== index));
  const updateSkill = (index: number, value: string) =>
    setSkills((s) => {
      const copy = [...s];
      copy[index] = value;
      return copy;
    });

  // Save handler: POST to your api route (/api/hero/update)
  const handleSave = async () => {
    if (!heroData) return;
    setIsSaving(true);
    setLoadingText?.("Saving hero...");
    setIsLoading(true);

    try {
      // Merge transient local fields
      const payload = {
        ...heroData,
        skills,
        social_links: socialLinks,
      };

      const res = await fetch("/api/hero/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message || json?.error || "Save failed");

      // Update local state with returned row if provided
      if (json?.data) {
        setHeroData(json.data);
        setSkills(json.data.skills ?? []);
        setSocialLinks(json.data.social_links ?? socialLinks);
      }

      toast({
        title: "✨ Hero section updated!",
        description: "Changes saved successfully",
      });
    } catch (err: any) {
      console.error("Error saving hero:", err);
      toast({
        title: "⚠️ Failed to save",
        description: err?.message || String(err),
      });
    } finally {
      setIsSaving(false);
      setIsLoading(false);
      setLoadingText?.(undefined);
    }
  };

  // Resume upload 
const handleResumeUpload = async (file: File) => {
  if (!file) return;

  setIsSaving(true);
  setLoadingText?.("Uploading resume...");
  setIsLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload/resume", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Upload failed");

    patchHero({ resume_url: json.url });

    toast({
      title: "📄 Resume uploaded!",
      description: "Stored in /public/uploads/",
    });
  } catch (err: any) {
    toast({ title: "⚠️ Failed to upload resume", description: err.message });
  } finally {
    setIsSaving(false);
    setIsLoading(false);
    setLoadingText?.(undefined);
  }
};


  // Profile image upload (similar to resume)
  const handleProfileUpload = async (file: File) => {
  if (!file) return;

  setIsSaving(true);
  setLoadingText?.("Uploading profile image...");
  setIsLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload/profile", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Upload failed");

    patchHero({ profile_image: json.url });

    toast({
      title: "✅ Profile uploaded!",
      description: "Stored in /public/uploads/",
    });
  } catch (err: any) {
    toast({ title: "⚠️ Failed to upload profile", description: err.message });
  } finally {
    setIsSaving(false);
    setIsLoading(false);
    setLoadingText?.(undefined);
  }
};


  // Safe cache-busted resume link
  const resumeUrlWithCacheBust = heroData?.resume_url ? `${heroData.resume_url}?t=${Date.now()}` : "";

  // Loading skeleton while initial data fetch
  if (heroData === null) return <AdminSkeleton type="editor" />;

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hero Section Editor</h1>
            <p className="text-muted-foreground">Edit your landing page main content</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your name, title, and main messaging</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Greeting Text</Label>
                  <Input
                    value={heroData.greeting ?? ""}
                    onChange={(e) => patchHero({ greeting: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input value={heroData.name ?? ""} onChange={(e) => patchHero({ name: e.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Professional Title</Label>
                <Input value={heroData.title ?? ""} onChange={(e) => patchHero({ title: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={heroData.description ?? ""}
                  onChange={(e) => patchHero({ description: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Skills */}
              <div className="space-y-2 mt-4">
                <Label>Skills</Label>
                {skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input value={skill} onChange={(e) => updateSkill(index, e.target.value)} />
                    <Button variant="destructive" size="icon" onClick={() => removeSkill(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={addSkill}>
                  <Plus className="mr-2 h-4 w-4" /> Add Skill
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Image */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
              <CardDescription>Upload or link your profile photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose to-hot-pink flex items-center justify-center overflow-hidden">
                  {heroData.profile_image && (
                    // keep plain <img> so existing code stays simple
                    <img src={heroData.profile_image} alt="Profile" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Image URL</Label>
                  <Input value={heroData.profile_image ?? ""} onChange={(e) => patchHero({ profile_image: e.target.value })} />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleProfileUpload(e.target.files[0]);
                    }}
                  />
                  {heroData.profile_image && (
                    <a href={`${heroData.profile_image}?t=${Date.now()}`} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">
                      View Current Profile Image
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Resume (PDF)</CardTitle>
              <CardDescription>Upload your resume in PDF format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleResumeUpload(e.target.files[0]);
                }}
              />
              {heroData.resume_url && (
                <a href={resumeUrlWithCacheBust} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  View Current Resume
                </a>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Email, phone, and address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={heroData.email ?? ""} onChange={(e) => patchHero({ email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={heroData.phone ?? ""} onChange={(e) => patchHero({ phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input value={heroData.address ?? ""} onChange={(e) => patchHero({ address: e.target.value })} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Enter your social media profile URLs</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
                { key: "instagram", label: "Instagram" },
                { key: "linkedin", label: "LinkedIn" },
                { key: "facebook", label: "Facebook" },
                { key: "youtube", label: "YouTube" },
              ].map((platform) => (
                <div key={platform.key} className="space-y-2">
                  <Label>{platform.label}</Label>
                  <Input
                    value={socialLinks?.[platform.key] ?? ""}
                    onChange={(e) => setSocialLinks((prev) => ({ ...prev, [platform.key]: e.target.value }))}
                    placeholder={`https://${platform.key}.com/your-profile`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Story (rich text) */}
          <Card>
            <CardHeader>
              <CardTitle>My Story</CardTitle>
              <CardDescription>Your personal story</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <RichTextEditor
                value={heroData.my_story ?? ""}
                onChange={(html) => patchHero({ my_story: html })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketing Philosophy</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={heroData.marketing_philosophy ?? ""}
                onChange={(e) => patchHero({ marketing_philosophy: e.target.value })}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Marketing Approach */}
          <Card>
            <CardHeader>
              <CardTitle>Marketing Approach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(heroData.marketing_approach ?? []).map((step: any, idx: number) => (
                <div key={idx} className="grid grid-cols-3 gap-2">
                  <Input
                    value={step.step ?? ""}
                    onChange={(e) => {
                      const updated = [...(heroData.marketing_approach ?? [])];
                      updated[idx] = { ...(updated[idx] ?? {}), step: e.target.value };
                      patchHero({ marketing_approach: updated });
                    }}
                    placeholder="Step number"
                  />
                  <Input
                    value={step.title ?? ""}
                    onChange={(e) => {
                      const updated = [...(heroData.marketing_approach ?? [])];
                      updated[idx] = { ...(updated[idx] ?? {}), title: e.target.value };
                      patchHero({ marketing_approach: updated });
                    }}
                    placeholder="Title"
                  />
                  <Input
                    value={step.desc ?? ""}
                    onChange={(e) => {
                      const updated = [...(heroData.marketing_approach ?? [])];
                      updated[idx] = { ...(updated[idx] ?? {}), desc: e.target.value };
                      patchHero({ marketing_approach: updated });
                    }}
                    placeholder="Description"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const updated = (heroData.marketing_approach ?? []).filter((_: any, i: number) => i !== idx);
                      patchHero({ marketing_approach: updated });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  patchHero({ marketing_approach: [...(heroData.marketing_approach ?? []), { step: "", title: "", desc: "" }] })
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Add Step
              </Button>
            </CardContent>
          </Card>

          {/* Unique traits */}
          <Card>
            <CardHeader>
              <CardTitle>What Makes Me Unique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(heroData.unique_traits ?? []).map((trait: any, idx: number) => (
                <div key={idx} className="grid grid-cols-4 gap-2">
                  <Input
                    value={trait.icon ?? ""}
                    onChange={(e) => {
                      const updated = [...(heroData.unique_traits ?? [])];
                      updated[idx] = { ...(updated[idx] ?? {}), icon: e.target.value };
                      patchHero({ unique_traits: updated });
                    }}
                    placeholder="Icon name (Lucide)"
                  />
                  <Input
                    value={trait.title ?? ""}
                    onChange={(e) => {
                      const updated = [...(heroData.unique_traits ?? [])];
                      updated[idx] = { ...(updated[idx] ?? {}), title: e.target.value };
                      patchHero({ unique_traits: updated });
                    }}
                    placeholder="Title"
                  />
                  <Input
                    value={trait.desc ?? ""}
                    onChange={(e) => {
                      const updated = [...(heroData.unique_traits ?? [])];
                      updated[idx] = { ...(updated[idx] ?? {}), desc: e.target.value };
                      patchHero({ unique_traits: updated });
                    }}
                    placeholder="Description"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const updated = (heroData.unique_traits ?? []).filter((_: any, i: number) => i !== idx);
                      patchHero({ unique_traits: updated });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  patchHero({ unique_traits: [...(heroData.unique_traits ?? []), { icon: "Sparkles", title: "", desc: "" }] })
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Add Trait
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
