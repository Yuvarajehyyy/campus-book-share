import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* About Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-background/10">
        <div className="max-w-2xl">
          <h3 className="text-lg font-semibold mb-2">About BookSwap</h3>
          <p className="text-background/70 text-sm leading-relaxed">
            BookSwap is a campus-first platform designed to help students share, sell, and exchange 
            textbooks within their college community. Our mission is to make education more affordable 
            by reducing textbook costs and promoting sustainable book sharing.
          </p>
        </div>
      </div>

      {/* Links Columns */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Logo Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-background rounded-md">
                <BookOpen className="h-4 w-4 text-foreground" />
              </div>
              <span className="text-base font-semibold">BookSwap</span>
            </Link>
            <p className="text-background/60 text-sm">
              Campus book exchange for students
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/browse" className="hover:text-background transition-colors">Browse Books</Link></li>
              <li><Link to="/books/new" className="hover:text-background transition-colors">List a Book</Link></li>
              <li><Link to="/dashboard" className="hover:text-background transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3 text-sm">Categories</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/browse?type=sell" className="hover:text-background transition-colors">For Sale</Link></li>
              <li><Link to="/browse?type=lend" className="hover:text-background transition-colors">For Lending</Link></li>
              <li><Link to="/browse?type=free" className="hover:text-background transition-colors">Free Books</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="#" className="hover:text-background transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Report Issue</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="#" className="hover:text-background transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Guidelines</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-background/60">
            <p>© 2026 BookSwap. Made for students, by students.</p>
            <p>Built with ❤️ for campus communities</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
