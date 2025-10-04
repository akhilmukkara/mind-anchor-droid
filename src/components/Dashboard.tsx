import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Unlock, Flame, Target, Clock } from "lucide-react";
import { toast } from "sonner";

export const Dashboard = () => {
  const [monkModeActive, setMonkModeActive] = useState(false);
  const [streak, setStreak] = useState(7);

  const toggleMonkMode = () => {
    setMonkModeActive(!monkModeActive);
    if (!monkModeActive) {
      toast.success("Monk Mode Activated! 🔒", {
        description: "All distractions blocked. Focus time begins.",
      });
    } else {
      toast.info("Monk Mode Deactivated", {
        description: "You're back to normal mode.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-4xl font-bold text-foreground">Locked In</h1>
          <p className="text-muted-foreground">Reclaim your focus</p>
        </div>

        {/* Monk Mode Toggle */}
        <Card className="p-8 bg-card shadow-soft hover:shadow-glow transition-all duration-300">
          <div className="text-center space-y-6">
            <div className={`inline-flex p-6 rounded-full transition-all duration-500 ${
              monkModeActive 
                ? 'bg-locked text-locked-foreground shadow-glow' 
                : 'bg-primary text-primary-foreground'
            }`}>
              {monkModeActive ? (
                <Lock className="w-12 h-12" />
              ) : (
                <Unlock className="w-12 h-12" />
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {monkModeActive ? "Monk Mode Active" : "Monk Mode"}
              </h2>
              <p className="text-muted-foreground">
                {monkModeActive 
                  ? "Stay focused. All distractions blocked." 
                  : "One click to block all distractions"}
              </p>
            </div>

            <Button
              size="lg"
              onClick={toggleMonkMode}
              className={`w-full text-lg font-semibold transition-all duration-300 ${
                monkModeActive 
                  ? 'bg-locked hover:bg-locked/90' 
                  : 'bg-gradient-primary hover:opacity-90'
              }`}
            >
              {monkModeActive ? "Deactivate Monk Mode" : "Activate Monk Mode"}
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-card shadow-soft hover:shadow-glow transition-all">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-success rounded-full">
                <Flame className="w-6 h-6 text-success-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-foreground">{streak} days</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card shadow-soft hover:shadow-glow transition-all">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-primary rounded-full">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Habits Today</p>
                <p className="text-2xl font-bold text-foreground">3/5</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card shadow-soft hover:shadow-glow transition-all">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-accent rounded-full">
                <Clock className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Focus Time</p>
                <p className="text-2xl font-bold text-foreground">2.5h</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
