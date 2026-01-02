import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BookForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "", author: "", edition: "", description: "",
    category: "sell" as "sell" | "lend" | "free",
    price: "", course_tag: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
    });
    if (isEditing) fetchBook();
  }, [id, navigate]);

  const fetchBook = async () => {
    const { data } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
    if (data) {
      setFormData({
        title: data.title, author: data.author, edition: data.edition || "",
        description: data.description || "", category: data.category,
        price: data.price?.toString() || "", course_tag: data.course_tag || "",
      });
      if (data.image_url) setImagePreview(data.image_url);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast({ title: "Invalid image", description: "Please select an image under 5MB", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase.from("profiles").select("id").eq("user_id", user.id).single();
      if (!profile) throw new Error("Profile not found");

      let imageUrl = imagePreview;
      if (imageFile) {
        const fileName = `${user.id}/${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage.from("book-images").upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from("book-images").getPublicUrl(fileName);
        imageUrl = publicUrl;
      }

      const bookData = {
        title: formData.title, author: formData.author, edition: formData.edition || null,
        description: formData.description || null, category: formData.category,
        price: formData.category === "sell" && formData.price ? parseFloat(formData.price) : null,
        course_tag: formData.course_tag || null, image_url: imageUrl,
        owner_id: profile.id,
      };

      if (isEditing) {
        await supabase.from("books").update(bookData).eq("id", id);
        toast({ title: "Book updated!" });
      } else {
        await supabase.from("books").insert(bookData);
        toast({ title: "Book listed!" });
      }
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="content-container max-w-2xl">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="font-serif text-3xl font-bold mb-8">{isEditing ? "Edit Book" : "List a Book"}</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-xl border p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Title *</Label><Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="input-field" /></div>
              <div><Label>Author *</Label><Input value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} required className="input-field" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Edition</Label><Input value={formData.edition} onChange={(e) => setFormData({...formData, edition: e.target.value})} className="input-field" /></div>
              <div><Label>Course Tag</Label><Input placeholder="B.E CSE Sem 4" value={formData.course_tag} onChange={(e) => setFormData({...formData, course_tag: e.target.value})} className="input-field" /></div>
            </div>
            <div><Label>Description</Label><Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4} className="input-field" /></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Category *</Label>
                <Select value={formData.category} onValueChange={(v: any) => setFormData({...formData, category: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sell">For Sale</SelectItem>
                    <SelectItem value="lend">For Lending</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.category === "sell" && <div><Label>Price (₹)</Label><Input type="number" min="0" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="input-field" /></div>}
            </div>
            <div>
              <Label>Book Image</Label>
              <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center">
                {imagePreview ? <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-4" /> : <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-2" />}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer text-primary hover:underline"><Upload className="h-4 w-4 inline mr-1" />Upload Image</label>
              </div>
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>{loading ? "Saving..." : isEditing ? "Update Book" : "List Book"}</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookForm;
