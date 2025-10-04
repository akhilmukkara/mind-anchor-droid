import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

export const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Morning meditation", completed: false },
    { id: "2", name: "Exercise", completed: true },
    { id: "3", name: "Read for 30 minutes", completed: false },
    { id: "4", name: "No social media before noon", completed: true },
    { id: "5", name: "Journal before bed", completed: false },
  ]);
  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([
        ...habits,
        { id: Date.now().toString(), name: newHabit, completed: false },
      ]);
      setNewHabit("");
      toast.success("Habit added!");
    }
  };

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
    toast.info("Habit removed");
  };

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-4xl font-bold text-foreground">Habit Tracker</h1>
          <p className="text-muted-foreground">
            {completedCount} of {habits.length} completed today
          </p>
        </div>

        <Card className="p-6 bg-card shadow-soft">
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add a new habit..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addHabit()}
              className="flex-1"
            />
            <Button onClick={addHabit} className="bg-gradient-primary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {habits.map((habit) => (
              <Card
                key={habit.id}
                className={`p-4 transition-all duration-300 ${
                  habit.completed
                    ? "bg-gradient-success/10 border-success"
                    : "bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={habit.completed}
                    onCheckedChange={() => toggleHabit(habit.id)}
                    className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                  <span
                    className={`flex-1 ${
                      habit.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {habit.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteHabit(habit.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
