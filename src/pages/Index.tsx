import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, HandHeart, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroLeft from "@/assets/hero-left.png";
import heroRight from "@/assets/hero-right.png";

const Index = () => {
  return (
    <div className="bg-background">
      <Header />

      <main>
        {/* Hero - 3 Column Desktop Layout */}
        <section className="bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-8 items-start">
              {/* Left Image */}
              <div className="pt-8">
                <img 
                  src={heroLeft} 
                  alt="Stack of books illustration" 
                  className="w-full max-w-xs object-contain"
                />
              </div>

              {/* Center Content */}
              <div className="pt-12 pb-8 text-center">
                <h1 className="text-3xl font-semibold text-foreground mb-3">
                  Campus Book Exchange
                </h1>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Buy, sell, or share textbooks with students on your campus. 
                  Save money and help your fellow students succeed.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link to="/browse">
                    <Button>
                      Browse Books
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  <Link to="/books/new">
                    <Button variant="outline">
                      List a Book
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-border">
                  <div>
                    <p className="text-2xl font-semibold text-foreground">500+</p>
                    <p className="text-sm text-muted-foreground">Books Listed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">1.2k</p>
                    <p className="text-sm text-muted-foreground">Students</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">₹50k+</p>
                    <p className="text-sm text-muted-foreground">Saved</p>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="pt-8 flex justify-end">
                <img 
                  src={heroRight} 
                  alt="Students sharing books illustration" 
                  className="w-full max-w-xs object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">How It Works</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="w-10 h-10 bg-sell/10 rounded-lg flex items-center justify-center mb-3">
                  <DollarSign className="h-5 w-5 text-sell" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Sell Books</h3>
                <p className="text-sm text-muted-foreground">
                  List your used textbooks and set your own price. Get paid directly.
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="w-10 h-10 bg-lend/10 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-lend" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Lend Books</h3>
                <p className="text-sm text-muted-foreground">
                  Share temporarily with classmates. Set lending period and terms.
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="w-10 h-10 bg-free/10 rounded-lg flex items-center justify-center mb-3">
                  <HandHeart className="h-5 w-5 text-free" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Give Away</h3>
                <p className="text-sm text-muted-foreground">
                  Donate books you no longer need. Help students who can't afford.
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Find Books</h3>
                <p className="text-sm text-muted-foreground">
                  Search by course, department, or title. Connect with book owners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Browse by Category</h2>
              <Link to="/browse" className="text-sm text-primary hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {[
                "Engineering",
                "Medicine",
                "Business",
                "Science",
                "Arts",
                "Law"
              ].map((category) => (
                <Link 
                  key={category} 
                  to={`/browse?category=${category.toLowerCase()}`}
                  className="bg-card p-4 rounded-lg border border-border text-center hover:border-primary hover:bg-secondary/50 transition-colors"
                >
                  <p className="font-medium text-foreground">{category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 bg-primary/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  Ready to start sharing?
                </h2>
                <p className="text-muted-foreground">
                  Join hundreds of students already using BookSwap on campus.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/auth?mode=signup">
                  <Button>Get Started Free</Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline">Browse Books</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
