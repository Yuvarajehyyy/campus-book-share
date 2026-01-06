import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, Tag } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  category: "sell" | "lend" | "free";
  price?: number | null;
  courseTag?: string | null;
  imageUrl?: string | null;
  status: "available" | "reserved" | "taken";
  ownerName: string;
}

const BookCard = ({
  id,
  title,
  author,
  category,
  price,
  courseTag,
  imageUrl,
  status,
  ownerName,
}: BookCardProps) => {
  const getCategoryStyles = () => {
    switch (category) {
      case "sell":
        return "bg-sell text-sell-foreground";
      case "lend":
        return "bg-lend text-lend-foreground";
      case "free":
        return "bg-free text-free-foreground";
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case "available":
        return "text-available";
      case "reserved":
        return "text-reserved";
      case "taken":
        return "text-taken";
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case "sell":
        return price ? `₹${price}` : "For Sale";
      case "lend":
        return "Lend";
      case "free":
        return "Free";
    }
  };

  return (
    <Link to={`/books/${id}`} className="block group">
      <article className="card-elevated overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <BookOpen className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Category Badge */}
          <Badge 
            className={`absolute top-2.5 left-2.5 ${getCategoryStyles()} text-xs font-medium`}
          >
            {getCategoryLabel()}
          </Badge>

          {/* Status Indicator */}
          {status !== "available" && (
            <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
              <span className="bg-card px-3 py-1.5 rounded-md text-sm font-medium capitalize">
                {status}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5 flex-1 flex flex-col">
          <h3 className="text-base font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            by {author}
          </p>

          <div className="mt-auto pt-3 flex items-center justify-between">
            {courseTag && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Tag className="h-3 w-3" />
                <span>{courseTag}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
              <User className="h-3 w-3" />
              <span>{ownerName}</span>
            </div>
          </div>

          {/* Status */}
          <div className={`mt-2 text-xs font-medium capitalize ${getStatusStyles()}`}>
            • {status}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BookCard;