import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-warm py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="content-container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up">
            <Sparkles className="h-4 w-4" />
            <span>Campus Book Exchange Platform</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up stagger-1">
            Share Knowledge,{" "}
            <span className="text-primary">Save Money</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up stagger-2">
            Connect with fellow students to buy, sell, lend, or get free textbooks. 
            Build a sustainable campus community through book sharing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="xl">
                <BookOpen className="h-5 w-5" />
                Start Sharing
              </Button>
            </Link>
            <Link to="/#books">
              <Button variant="outline" size="xl">
                Browse Books
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50 animate-fade-up stagger-4">
            <div className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Free
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                To Use
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                <Users className="h-6 w-6 md:h-8 md:w-8 mx-auto text-primary" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                For Students
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Easy
              </div>
              <div className="text-sm text-muted-foreground mt-1">
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
