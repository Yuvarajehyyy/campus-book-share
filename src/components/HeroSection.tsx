import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="content-container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium mb-5 animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Campus Book Exchange</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 animate-fade-up stagger-1">
            Share Knowledge,{" "}
            <span className="text-primary">Save Money</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl mx-auto animate-fade-up stagger-2">
            Connect with fellow students to buy, sell, lend, or get free textbooks. 
            Build a sustainable campus community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up stagger-3">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="font-medium">
                <BookOpen className="h-4 w-4" />
                Start Sharing
              </Button>
            </Link>
            <Link to="/#books">
              <Button variant="outline" size="lg" className="font-medium">
                Browse Books
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-border/50 animate-fade-up stagger-4">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-semibold text-foreground">
                Free
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                To Use
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                For Students
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-semibold text-foreground">
                Easy
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                To Connect
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;