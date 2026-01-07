import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

const BrowseBooks = () => {
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

      <main className="flex-1 py-6">
        <div className="content-container">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-foreground">Browse Books</h1>
            <p className="text-sm text-muted-foreground">
              Find textbooks from students on campus
            </p>
          </div>

          <div className="mb-4">
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

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[3/4] rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary rounded-full mb-3">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-1">
                No books found
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery || categoryFilter !== "all" || courseFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Be the first to list a book!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
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
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrowseBooks;
