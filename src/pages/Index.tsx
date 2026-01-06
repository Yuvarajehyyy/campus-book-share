import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import BookFilters from "@/components/BookFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  category: "sell" | "lend" | "free";
  price: number | null;
  course_tag: string | null;
  image_url: string | null;
  status: "available" | "reserved" | "taken";
  owner: {
    name: string;
  };
}

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [courses, setCourses] = useState<string[]>([]);

  useEffect(() => {
    fetchBooks();
    fetchCourses();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select(`
        id,
        title,
        author,
        category,
        price,
        course_tag,
        image_url,
        status,
        owner:profiles!books_owner_id_fkey(name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching books:", error);
    } else {
      setBooks(data as unknown as Book[]);
    }
    setLoading(false);
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("course_tag")
      .not("course_tag", "is", null);

    if (!error && data) {
      const uniqueCourses = [...new Set(data.map((b) => b.course_tag).filter(Boolean))] as string[];
      setCourses(uniqueCourses);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || book.category === categoryFilter;

    const matchesCourse =
      courseFilter === "all" || book.course_tag === courseFilter;

    return matchesSearch && matchesCategory && matchesCourse;
  });

  return (
    <div className="page-container flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <HeroSection />

        {/* Books Section */}
        <section id="books" className="py-10 md:py-12">
          <div className="content-container">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-1.5">
                Available Books
              </h2>
              <p className="text-muted-foreground text-sm">
                Find textbooks from students in your campus
              </p>
            </div>

            {/* Filters */}
            <div className="mb-6">
              <BookFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                courseFilter={courseFilter}
                setCourseFilter={setCourseFilter}
                courses={courses}
              />
            </div>

            {/* Books Grid */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-[4/5] rounded-lg" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary rounded-full mb-3">
                  <BookOpen className="h-7 w-7 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  No books found
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || categoryFilter !== "all" || courseFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Be the first to list a book!"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <BookCard
                      id={book.id}
                      title={book.title}
                      author={book.author}
                      category={book.category}
                      price={book.price}
                      courseTag={book.course_tag}
                      imageUrl={book.image_url}
                      status={book.status}
                      ownerName={book.owner?.name || "Unknown"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;