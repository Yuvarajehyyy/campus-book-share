import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  ArrowLeft,
  Mail,
  User,
  Building,
  GraduationCap,
  Tag,
  Calendar,
} from "lucide-react";

interface BookDetail {
  id: string;
  title: string;
  author: string;
  edition: string | null;
  description: string | null;
  category: "sell" | "lend" | "free";
  price: number | null;
  course_tag: string | null;
  image_url: string | null;
  status: "available" | "reserved" | "taken";
  created_at: string;
  owner: {
    id: string;
    name: string;
    email: string;
    department: string | null;
    semester: string | null;
  };
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    const { data, error } = await supabase
      .from("books")
      .select(`
        *,
        owner:profiles!books_owner_id_fkey(id, name, email, department, semester)
      `)
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching book:", error);
    } else {
      setBook(data as unknown as BookDetail);
    }
    setLoading(false);
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "sell":
        return "bg-sell text-sell-foreground";
      case "lend":
        return "bg-lend text-lend-foreground";
      case "free":
        return "bg-free text-free-foreground";
      default:
        return "";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "available":
        return "text-available bg-available/10";
      case "reserved":
        return "text-reserved bg-reserved/10";
      case "taken":
        return "text-taken bg-taken/10";
      default:
        return "";
    }
  };

  const getCategoryLabel = () => {
    if (!book) return "";
    switch (book.category) {
      case "sell":
        return book.price ? `₹${book.price}` : "For Sale";
      case "lend":
        return "For Lending";
      case "free":
        return "Free";
    }
  };

  const handleContact = () => {
    if (book?.owner.email) {
      const subject = encodeURIComponent(`Inquiry about: ${book.title}`);
      const body = encodeURIComponent(
        `Hi ${book.owner.name},\n\nI'm interested in your book "${book.title}" listed on BookSwap.\n\nPlease let me know if it's still available.\n\nThanks!`
      );
      window.location.href = `mailto:${book.owner.email}?subject=${subject}&body=${body}`;
    }
  };

  if (loading) {
    return (
      <div className="page-container flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8">
          <div className="content-container">
            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="aspect-[3/4] rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="page-container flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
              Book not found
            </h1>
            <p className="text-muted-foreground mb-4">
              This book may have been removed or doesn't exist.
            </p>
            <Link to="/">
              <Button variant="hero">
                <ArrowLeft className="h-4 w-4" />
                Back to Books
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-8">
        <div className="content-container">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[3/4] bg-secondary rounded-xl overflow-hidden shadow-lg">
                {book.image_url ? (
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-warm">
                    <BookOpen className="h-24 w-24 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {/* Category Badge */}
              <Badge
                className={`absolute top-4 left-4 text-sm ${getCategoryStyles(book.category)}`}
              >
                {getCategoryLabel()}
              </Badge>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Status */}
              <Badge
                variant="outline"
                className={`capitalize ${getStatusStyles(book.status)}`}
              >
                {book.status}
              </Badge>

              {/* Title & Author */}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground">by {book.author}</p>
                {book.edition && (
                  <p className="text-muted-foreground mt-1">
                    Edition: {book.edition}
                  </p>
                )}
              </div>

              {/* Course Tag */}
              {book.course_tag && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span>{book.course_tag}</span>
                </div>
              )}

              {/* Description */}
              {book.description && (
                <div className="bg-card rounded-xl border border-border p-4">
                  <h3 className="font-medium text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Owner Info */}
              <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                <h3 className="font-medium text-foreground">Listed by</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{book.owner.name}</span>
                  </div>
                  {book.owner.department && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building className="h-4 w-4" />
                      <span>{book.owner.department}</span>
                    </div>
                  )}
                  {book.owner.semester && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>{book.owner.semester}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Listed Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Listed on {new Date(book.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Contact Button */}
              {book.status === "available" && (
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handleContact}
                >
                  <Mail className="h-5 w-5" />
                  Contact Owner
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetail;
