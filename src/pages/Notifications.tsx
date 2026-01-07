import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bell, BookOpen, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "request" | "update" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "request",
    title: "New book request",
    message: "Someone is interested in your 'Data Structures' textbook",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "update",
    title: "Book status updated",
    message: "Your 'Introduction to Algorithms' is now marked as reserved",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Welcome to BookSwap",
    message: "Start by browsing available books or listing your own",
    time: "3 days ago",
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "request":
        return <BookOpen className="h-4 w-4" />;
      case "update":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="page-container flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-6">
        <div className="content-container max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary rounded-full mb-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-1">
                No notifications
              </h3>
              <p className="text-sm text-muted-foreground">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    notification.read
                      ? "bg-background border-border"
                      : "bg-card border-primary/20"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.read
                          ? "bg-secondary text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm ${
                            notification.read
                              ? "text-muted-foreground"
                              : "text-foreground font-medium"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;
