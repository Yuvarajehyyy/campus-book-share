import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, HandHeart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="page-container flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Compact Hero */}
        <section className="py-8 md:py-12">
          <div className="content-container">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Campus Book Exchange
              </h1>
              <p className="text-muted-foreground mb-5">
                Buy, sell, or share textbooks with students on your campus. 
                Save money and help others.
              </p>
              <Link to="/browse">
                <Button size="default" className="font-medium">
                  Browse Books
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Simple Features - 3 items max */}
        <section className="py-6 border-t border-border">
          <div className="content-container">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary rounded-lg mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-foreground">Sell Books</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  List your old textbooks for sale
                </p>
              </div>
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary rounded-lg mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-foreground">Lend Books</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Share with fellow students
                </p>
              </div>
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary rounded-lg mb-2">
                  <HandHeart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-foreground">Give Away</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Donate books you no longer need
                </p>
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
