import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";

const HistoryList = () => {
  // Mock history for UI display
  const mockHistory = [
    { id: "1", bookTitle: "Introduction to Algorithms", type: "sold", date: "Dec 15, 2025", amount: "₹500" },
    { id: "2", bookTitle: "Computer Architecture", type: "exchanged", date: "Nov 28, 2025", amount: null },
  ];

  if (mockHistory.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No transaction history</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {mockHistory.map(item => (
        <div key={item.id} className="bg-secondary/30 rounded-lg p-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center shrink-0">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm truncate">{item.bookTitle}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">{item.date}</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${item.type === "sold" ? "text-green-600" : "text-blue-600"}`}
              >
                {item.type === "sold" ? "Sold" : "Exchanged"}
              </Badge>
            </div>
          </div>
          {item.amount && (
            <span className="text-sm font-medium text-green-600">{item.amount}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
