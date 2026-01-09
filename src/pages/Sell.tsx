import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, ShoppingCart, User } from "lucide-react";

const Sell = () => {
  const [condition, setCondition] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Mock books for UI display - sell only
  const mockBooks = [
    { id: "1", title: "Data Structures & Algorithms", category: "Computer Science", condition: "Good", price: 450, seller: "Rahul Sharma" },
    { id: "2", title: "Operating System Concepts", category: "Computer Science", condition: "New", price: 600, seller: "Priya Patel" },
    { id: "3", title: "Engineering Mathematics", category: "Mathematics", condition: "Used", price: 250, seller: "Amit Kumar" },
    { id: "4", title: "Digital Electronics", category: "Electronics", condition: "Good", price: 380, seller: "Sneha Reddy" },
    { id: "5", title: "Discrete Mathematics", category: "Mathematics", condition: "New", price: 350, seller: "Vikram Singh" },
    { id: "6", title: "Thermodynamics", category: "Mechanical", condition: "Good", price: 420, seller: "Anjali Gupta" },
  ];

  const filteredBooks = mockBooks.filter(book => {
    if (condition !== "all" && book.condition.toLowerCase() !== condition) return false;
    if (priceRange === "under300" && book.price >= 300) return false;
    if (priceRange === "300to500" && (book.price < 300 || book.price > 500)) return false;
    if (priceRange === "above500" && book.price <= 500) return false;
    return true;
  });

  const getConditionColor = (cond: string) => {
    switch (cond.toLowerCase()) {
      case "new": return "bg-free/20 text-free";
      case "good": return "bg-lend/20 text-lend";
      case "used": return "bg-sell/20 text-sell";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="bg-background">
      <Header />
      
      <main className="py-8">
        <div className="content-container">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground mb-1">Sell Books</h1>
            <p className="text-muted-foreground">Find affordable textbooks from students on your campus</p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under300">Under ₹300</SelectItem>
                <SelectItem value="300to500">₹300 - ₹500</SelectItem>
                <SelectItem value="above500">Above ₹500</SelectItem>
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cse">Computer Science</SelectItem>
                <SelectItem value="ece">Electronics</SelectItem>
                <SelectItem value="mech">Mechanical</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
              </SelectContent>
            </Select>

            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="used">Used</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Books Grid */}
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg border border-border">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary rounded-full mb-4">
                <ShoppingCart className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No books for sale</h3>
              <p className="text-muted-foreground">Check back later or adjust your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredBooks.map(book => (
                <div key={book.id} className="bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors">
                  <div className="flex gap-3 mb-3">
                    <div className="w-16 h-20 bg-secondary rounded flex items-center justify-center shrink-0">
                      <BookOpen className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm leading-tight mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-xs text-muted-foreground">{book.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`text-xs ${getConditionColor(book.condition)}`}>
                      {book.condition}
                    </Badge>
                    <Badge className="text-xs bg-sell/20 text-sell">
                      Sell
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-lg text-foreground">₹{book.price}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{book.seller}</span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full" variant="sell">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Contact Seller
                  </Button>
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

export default Sell;
