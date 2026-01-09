import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, RefreshCw, ShoppingCart } from "lucide-react";

const Exchange = () => {
  const [activeTab, setActiveTab] = useState<"sell" | "exchange">("sell");
  const [condition, setCondition] = useState<string>("all");
  const [department, setDepartment] = useState<string>("all");

  // Mock books for UI display
  const mockBooks = [
    { id: "1", title: "Data Structures & Algorithms", author: "Thomas H. Cormen", condition: "Good", type: "sell", price: 450 },
    { id: "2", title: "Operating System Concepts", author: "Abraham Silberschatz", condition: "New", type: "sell", price: 600 },
    { id: "3", title: "Database Management Systems", author: "Raghu Ramakrishnan", condition: "Used", type: "exchange", price: null },
    { id: "4", title: "Computer Networks", author: "Andrew S. Tanenbaum", condition: "Good", type: "exchange", price: null },
    { id: "5", title: "Discrete Mathematics", author: "Kenneth H. Rosen", condition: "New", type: "sell", price: 350 },
    { id: "6", title: "Theory of Computation", author: "Michael Sipser", condition: "Good", type: "exchange", price: null },
  ];

  const filteredBooks = mockBooks.filter(book => {
    if (activeTab !== "sell" && activeTab !== "exchange") return true;
    if (book.type !== activeTab) return false;
    if (condition !== "all" && book.condition.toLowerCase() !== condition) return false;
    return true;
  });

  const getConditionColor = (cond: string) => {
    switch (cond.toLowerCase()) {
      case "new": return "bg-green-100 text-green-700";
      case "good": return "bg-blue-100 text-blue-700";
      case "used": return "bg-orange-100 text-orange-700";
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
            <h1 className="text-2xl font-semibold text-foreground mb-1">Exchange & Sell Books</h1>
            <p className="text-muted-foreground">Sell books or exchange them with students on your campus</p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "sell" | "exchange")} className="mb-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="sell" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Sell
              </TabsTrigger>
              <TabsTrigger value="exchange" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Exchange
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cse">Computer Science</SelectItem>
                <SelectItem value="ece">Electronics</SelectItem>
                <SelectItem value="mech">Mechanical</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
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
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No books found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or check back later</p>
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
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`text-xs ${getConditionColor(book.condition)}`}>
                      {book.condition}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {book.type === "sell" ? "For Sale" : "Exchange"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    {book.type === "sell" && book.price && (
                      <span className="font-semibold text-foreground">₹{book.price}</span>
                    )}
                    {book.type === "exchange" && (
                      <span className="text-sm text-muted-foreground">Open to exchange</span>
                    )}
                    <Button size="sm" className="ml-auto">
                      {book.type === "sell" ? "Buy / Contact" : "Request Exchange"}
                    </Button>
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

export default Exchange;
