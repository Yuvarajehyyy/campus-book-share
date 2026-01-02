import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";

const Dashboard = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else fetchBooks(session.user.id);
    });
  }, [navigate]);

  const fetchBooks = async (userId: string) => {
    const { data: profile } = await supabase.from("profiles").select("id").eq("user_id", userId).maybeSingle();
    if (profile) {
      const { data } = await supabase.from("books").select("*").eq("owner_id", profile.id).order("created_at", { ascending: false });
      setBooks(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (bookId: string, status: "available" | "reserved" | "taken") => {
    await supabase.from("books").update({ status }).eq("id", bookId);
    setBooks(books.map(b => b.id === bookId ? {...b, status} : b));
    toast({ title: "Status updated" });
  };

  const deleteBook = async (bookId: string) => {
    if (!confirm("Delete this book?")) return;
    await supabase.from("books").delete().eq("id", bookId);
    setBooks(books.filter(b => b.id !== bookId));
    toast({ title: "Book deleted" });
  };

  const getCategoryColor = (cat: string) => cat === "sell" ? "bg-sell text-sell-foreground" : cat === "lend" ? "bg-lend text-lend-foreground" : "bg-free text-free-foreground";

  return (
    <div className="page-container flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="content-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl font-bold">My Dashboard</h1>
            <Link to="/books/new"><Button variant="hero"><Plus className="h-4 w-4" /> List a Book</Button></Link>
          </div>
          {loading ? <p>Loading...</p> : books.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">No books listed yet</h3>
              <Link to="/books/new"><Button variant="hero"><Plus className="h-4 w-4" /> List Your First Book</Button></Link>
            </div>
          ) : (
            <div className="space-y-4">
              {books.map(book => (
                <div key={book.id} className="bg-card rounded-xl border p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="w-16 h-20 bg-secondary rounded-lg overflow-hidden shrink-0">
                    {book.image_url ? <img src={book.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><BookOpen className="h-6 w-6 text-muted-foreground" /></div>}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <Badge className={`mt-1 ${getCategoryColor(book.category)}`}>{book.category === "sell" && book.price ? `₹${book.price}` : book.category}</Badge>
                  </div>
                  <Select value={book.status} onValueChange={(v) => updateStatus(book.id, v)}>
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="taken">Taken</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Link to={`/books/edit/${book.id}`}><Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                    <Button variant="outline" size="icon" onClick={() => deleteBook(book.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
