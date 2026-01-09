import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Check, X } from "lucide-react";

const RequestsList = () => {
  // Mock requests for UI display
  const mockRequests = [
    { id: "1", bookTitle: "Data Structures & Algorithms", requester: "John D.", type: "exchange" },
    { id: "2", bookTitle: "Operating System Concepts", requester: "Sarah M.", type: "exchange" },
  ];

  if (mockRequests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <RefreshCw className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No incoming requests</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {mockRequests.map(request => (
        <div key={request.id} className="bg-secondary/30 rounded-lg p-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm truncate">{request.bookTitle}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">From: {request.requester}</span>
              <Badge variant="outline" className="text-xs">Exchange</Badge>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Button size="icon" variant="outline" className="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-50">
              <Check className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon" variant="outline" className="h-7 w-7 text-destructive hover:bg-destructive/10">
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestsList;
