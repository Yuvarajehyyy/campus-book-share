import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, User, LogOut, Plus, Bell, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Header = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const catalogItems = {
    browse: {
      title: "Browse Books",
      columns: [
        {
          heading: "BY CATEGORY",
          links: [
            { label: "For Sale", href: "/browse?type=sell" },
            { label: "For Lending", href: "/browse?type=lend" },
            { label: "Free Books", href: "/browse?type=free" },
          ]
        },
        {
          heading: "BY DEPARTMENT",
          links: [
            { label: "Engineering", href: "/browse?dept=engineering" },
            { label: "Medicine", href: "/browse?dept=medicine" },
            { label: "Business", href: "/browse?dept=business" },
            { label: "Arts & Science", href: "/browse?dept=arts" },
          ]
        },
        {
          heading: "QUICK LINKS",
          links: [
            { label: "Recently Added", href: "/browse?sort=recent" },
            { label: "Most Popular", href: "/browse?sort=popular" },
            { label: "All Books", href: "/browse" },
          ]
        }
      ]
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-primary rounded-md">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold text-foreground">
              BookSwap
            </span>
          </Link>

          {/* Desktop Navigation with Hover Catalog */}
          <nav className="flex items-center gap-6">
            {/* Browse with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('browse')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/browse" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-4"
              >
                Browse
              </Link>
              
              {/* Hover Catalog Dropdown */}
              {activeDropdown === 'browse' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-card border border-border rounded-lg shadow-lg p-6 w-[500px]">
                    <div className="grid grid-cols-3 gap-6">
                      {catalogItems.browse.columns.map((column, idx) => (
                        <div key={idx}>
                          <h4 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wide">
                            {column.heading}
                          </h4>
                          <ul className="space-y-2">
                            {column.links.map((link, linkIdx) => (
                              <li key={linkIdx}>
                                <Link 
                                  to={link.href}
                                  className="text-sm text-foreground hover:text-primary transition-colors"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Exchange Link */}
            <Link 
              to="/exchange" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Exchange
            </Link>

            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/books/new" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  List Book
                </Link>
              </>
            )}
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center gap-2">
            <Link to="/browse">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </Link>
            
            {user ? (
              <>
                <Link to="/notifications">
                  <Button variant="ghost" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
                <Link to="/books/new">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    List
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
