"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import  RichTextEditor  from "@/admincomponents/RichTextEditor";


const supabase = createClient();

export default function HeroEditor() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [heroId, setHeroId] = useState<string>("");
  const [heroData, setHeroData] = useState<any>({
    greeting: "",
    name: "",
    title: "",
    tagline: "",
    description: "",
    profileImage: "",
    email: "",
    phone: "",
    address: "",
    resume_url: "",
    my_story: "",
    marketing_philosophy: "",
    marketing_approach: [],
    unique_traits: [],
  });

  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  // Fetch hero data on mount
  useEffect(() => {
    const fetchHero = async () => {
      const { data, error } = await supabase.from("hero").select("*").limit(1).single();
      if (error) {
        console.error("Error fetching hero:", error);
        return;
      }

      setHeroData({
        greeting: data.greeting || "",
        name: data.name || "",
        title: data.title || "",
        tagline: data.tagline || "",
        description: data.description || "",
        profileImage: data.profile_image || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        resume_url: data.resume_url || "",
        my_story: data.my_story || "",
        marketing_philosophy: data.marketing_philosophy || "",
        marketing_approach: data.marketing_approach || [],
        unique_traits: data.unique_traits || [],
      });

      setSocialLinks(data.social_links || {
        instagram: "",
        linkedin: "",
        facebook: "",
        youtube: ""
      });
      setSkills(data.skills || []);
      setHeroId(data.id);
    };

    fetchHero();
  }, []);

  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));
  const updateSkill = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };


  const handleSave = async () => {
    if (!heroId) return;
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("hero")
        .update({
          greeting: heroData.greeting,
          name: heroData.name,
          title: heroData.title,
          skills: skills,
          tagline: heroData.tagline,
          description: heroData.description,
          profile_image: heroData.profileImage,
          email: heroData.email,
          phone: heroData.phone,
          address: heroData.address,
          social_links: socialLinks,
          resume_url: heroData.resume_url,
          my_story: heroData.my_story,
          marketing_philosophy: heroData.marketing_philosophy,
          marketing_approach: heroData.marketing_approach,
          unique_traits: heroData.unique_traits,
        })
        .eq("id", heroId);

      if (error) throw error;

      toast({
        title: "✨ Hero section updated!",
        description: "Changes saved successfully",
      });
    } catch (err: any) {
      console.error("Error saving hero:", err);
      toast({
        title: "⚠️ Failed to save",
        description: err.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResumeUpload = async (file: File) => {
    if (!file) return;
    setIsSaving(true);

    try {
      const fileName = `Kyle-Ydrhaine-Villero-Resume.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("files")
        .update(fileName, file, {
          cacheControl: "3600",
          upsert: true
        });

      if (uploadError) {
        console.log("Upload error:", uploadError);
        throw uploadError
      };



      const { data } = supabase.storage.from("files").getPublicUrl(fileName);
      const publicUrl = data?.publicUrl;


      const { error: dbError } = await supabase
        .from("hero")
        .update({ resume_url: publicUrl })
        .eq("id", heroId);

      if (dbError) throw dbError;

      setHeroData((prev: any) => ({ ...prev, resume_url: publicUrl }));

      toast({
        title: "✅ Resume uploaded!",
        description: "Resume URL saved successfully",
      });
    } catch (err: any) {
      console.error("Error uploading resume:", err);
      toast({
        title: "⚠️ Failed to upload resume",
        description: err.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileUpload = async (file: File) => {
    if (!file) return;
    setIsSaving(true);

    try {
      // Create a consistent filename
      const fileName = `Kyle-Ydrhaine-Villero-Profile.${file.name.split('.').pop()}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("files") // make sure you have this bucket
        .update(fileName, file, {
          cacheControl: "3600",
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("files").getPublicUrl(fileName);
      const publicUrl = data?.publicUrl;

      // Update hero table
      const { error: dbError } = await supabase
        .from("hero")
        .update({ profile_image: publicUrl })
        .eq("id", heroId);

      if (dbError) throw dbError;

      setHeroData((prev: any) => ({ ...prev, profileImage: publicUrl }));

      toast({
        title: "✅ Profile image uploaded!",
        description: "Profile image URL saved successfully",
      });
    } catch (err: any) {
      console.error("Error uploading profile image:", err);
      toast({
        title: "⚠️ Failed to upload profile image",
        description: err.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resumeUrlWithCacheBust = `${heroData.resume_url}?t=${Date.now()}`;

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
                    value={heroData.greeting || ""}
                    onChange={(e) => setHeroData({ ...heroData, greeting: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input
                    value={heroData.name || ""}
                    onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Professional Title</Label>
                <Input
                  value={heroData.title || ""}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input
                  value={heroData.tagline || ""}
                  onChange={(e) => setHeroData({ ...heroData, tagline: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={heroData.description || ""}
                  onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Skills */}
              <div className="space-y-2 mt-4">
                <Label>Skills</Label>
                {skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeSkill(index)}
                    >
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
                  {heroData.profileImage && (
                    <img src={heroData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={heroData.profileImage || ""}
                    onChange={(e) => setHeroData({ ...heroData, profileImage: e.target.value })}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleProfileUpload(e.target.files[0]);
                    }}
                  />
                  {heroData.profileImage && (
                    <a
                      href={`${heroData.profileImage}?t=${Date.now()}`} // cache-busting
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline text-sm"
                    >
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
                <a
                  href={resumeUrlWithCacheBust}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
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
                  <Input
                    type="email"
                    value={heroData.email || ""}
                    onChange={(e) => setHeroData({ ...heroData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={heroData.phone || ""}
                    onChange={(e) => setHeroData({ ...heroData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    value={heroData.address || ""}
                    onChange={(e) => setHeroData({ ...heroData, address: e.target.value })}
                  />
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
                { key: "youtube", label: "YouTube" }
              ].map((platform) => (
                <div key={platform.key} className="space-y-2">
                  <Label>{platform.label}</Label>
                  <Input
                    value={socialLinks?.[platform.key] || ""}
                    onChange={(e) =>
                      setSocialLinks((prev) => ({
                        ...prev,
                        [platform.key]: e.target.value,
                      }))
                    }
                    placeholder={`https://${platform.key}.com/your-profile`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
{/* My Story */}
<Card>
  <CardHeader>
    <CardTitle>My Story</CardTitle>
    <CardDescription>Your personal story</CardDescription>
  </CardHeader>
  <CardContent className="space-y-2">
    <RichTextEditor
      value={heroData.my_story || ""}
      onChange={(html) =>
        setHeroData((prev:any) => ({ ...prev, my_story: html }))
      }
    />
  </CardContent>
</Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketing Philosophy</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={heroData.marketing_philosophy}
                onChange={(e) => setHeroData({ ...heroData, marketing_philosophy: e.target.value })}
                rows={3}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketing Approach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {heroData.marketing_approach.map((step: any, idx: number) => (
                <div key={idx} className="grid grid-cols-3 gap-2">
                  <Input
                    value={step.step}
                    onChange={(e) => {
                      const updated = [...heroData.marketing_approach];
                      updated[idx].step = e.target.value;
                      setHeroData({ ...heroData, marketing_approach: updated });
                    }}
                    placeholder="Step number"
                  />
                  <Input
                    value={step.title}
                    onChange={(e) => {
                      const updated = [...heroData.marketing_approach];
                      updated[idx].title = e.target.value;
                      setHeroData({ ...heroData, marketing_approach: updated });
                    }}
                    placeholder="Title"
                  />
                  <Input
                    value={step.desc}
                    onChange={(e) => {
                      const updated = [...heroData.marketing_approach];
                      updated[idx].desc = e.target.value;
                      setHeroData({ ...heroData, marketing_approach: updated });
                    }}
                    placeholder="Description"
                  />
                  <Button variant="destructive" size="icon" onClick={() => {
                    const updated = heroData.marketing_approach.filter((_: any, i: number) => i !== idx);
                    setHeroData({ ...heroData, marketing_approach: updated });
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={() => {
                setHeroData({ ...heroData, marketing_approach: [...heroData.marketing_approach, { step: "", title: "", desc: "" }] });
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add Step
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What Makes Me Unique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {heroData.unique_traits.map((trait: any, idx: number) => (
                <div key={idx} className="grid grid-cols-4 gap-2">
                  <Input
                    value={trait.icon}
                    onChange={(e) => {
                      const updated = [...heroData.unique_traits];
                      updated[idx].icon = e.target.value;
                      setHeroData({ ...heroData, unique_traits: updated });
                    }}
                    placeholder="Icon name (Lucide)"
                  />
                  <Input
                    value={trait.title}
                    onChange={(e) => {
                      const updated = [...heroData.unique_traits];
                      updated[idx].title = e.target.value;
                      setHeroData({ ...heroData, unique_traits: updated });
                    }}
                    placeholder="Title"
                  />
                  <Input
                    value={trait.desc}
                    onChange={(e) => {
                      const updated = [...heroData.unique_traits];
                      updated[idx].desc = e.target.value;
                      setHeroData({ ...heroData, unique_traits: updated });
                    }}
                    placeholder="Description"
                  />
                  <Button variant="destructive" size="icon" onClick={() => {
                    const updated = heroData.unique_traits.filter((_: any, i: number) => i !== idx);
                    setHeroData({ ...heroData, unique_traits: updated });
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={() => {
                setHeroData({ ...heroData, unique_traits: [...heroData.unique_traits, { icon: "Sparkles", title: "", desc: "" }] });
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add Trait
              </Button>
            </CardContent>
          </Card>

        </div>
      </motion.div>
    </div>
  );
}
