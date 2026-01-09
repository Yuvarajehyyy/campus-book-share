import { User, BookOpen, RefreshCw } from "lucide-react";

interface ProfileSummaryProps {
  booksCount: number;
}

const ProfileSummary = ({ booksCount }: ProfileSummaryProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">Student User</h3>
          <p className="text-sm text-muted-foreground">Engineering College</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary/50 rounded-lg p-3 text-center">
          <BookOpen className="h-5 w-5 mx-auto text-primary mb-1" />
          <p className="text-lg font-semibold text-foreground">{booksCount}</p>
          <p className="text-xs text-muted-foreground">Books Listed</p>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 text-center">
          <RefreshCw className="h-5 w-5 mx-auto text-primary mb-1" />
          <p className="text-lg font-semibold text-foreground">0</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
