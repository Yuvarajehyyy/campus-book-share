import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, HandHeart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-6 pb-4">
          <div className="content-container">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
                Campus Book Exchange
              </h1>
              <p className="text-sm text-muted-foreground mb-3">
                Buy, sell, or share textbooks with students on your campus.
              </p>
              <Link to="/browse">
                <Button size="sm">
                  Browse Books
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="pt-4 pb-6 border-t border-border mt-4">
          <div className="content-container">
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
              <div className="text-center p-2">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-secondary rounded mb-1">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xs font-medium text-foreground">Sell</h3>
              </div>
              <div className="text-center p-2">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-secondary rounded mb-1">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xs font-medium text-foreground">Lend</h3>
              </div>
              <div className="text-center p-2">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-secondary rounded mb-1">
                  <HandHeart className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xs font-medium text-foreground">Give</h3>
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
