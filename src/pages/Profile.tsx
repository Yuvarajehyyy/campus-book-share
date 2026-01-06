import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", department: "", semester: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else fetchProfile(session.user.id);
    });
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle();
    if (data) setProfile({ name: data.name, email: data.email, department: data.department || "", semester: data.semester || "", phone: data.phone || "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({ name: profile.name, department: profile.department || null, semester: profile.semester || null, phone: profile.phone || null }).eq("user_id", user.id);
      toast({ title: "Profile updated!" });
    }
    setLoading(false);
  };

  return (
    <div className="page-container flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-6">
        <div className="content-container max-w-md">
          <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-lg border border-border p-5">
            <div className="space-y-1.5">
              <Label className="text-sm">Name</Label>
              <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="input-field text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Email</Label>
              <Input value={profile.email} disabled className="input-field text-sm opacity-60" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Department</Label>
              <Input value={profile.department} onChange={(e) => setProfile({...profile, department: e.target.value})} className="input-field text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Semester/Year</Label>
              <Input value={profile.semester} onChange={(e) => setProfile({...profile, semester: e.target.value})} className="input-field text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Phone</Label>
              <Input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="input-field text-sm" />
            </div>
            <Button type="submit" className="w-full font-medium" disabled={loading}>
              {loading ? "Saving..." : "Update Profile"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;