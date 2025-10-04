import { Home, Target, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "habits", icon: Target, label: "Habits" },
    { id: "timer", icon: Clock, label: "Timer" },
    { id: "blocker", icon: Shield, label: "Blocker" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-2xl mx-auto px-6 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-4 transition-all ${
                currentPage === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};
