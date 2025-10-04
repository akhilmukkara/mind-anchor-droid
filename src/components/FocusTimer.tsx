import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const PRESETS = [
  { name: "Quick Focus", work: 25, break: 5 },
  { name: "Deep Work", work: 50, break: 10 },
  { name: "Ultra Focus", work: 90, break: 15 },
];

export const FocusTimer = () => {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [timeLeft, setTimeLeft] = useState(selectedPreset.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        toast.success("Focus session complete! Time for a break 🎉");
        setIsBreak(true);
        setTimeLeft(selectedPreset.break * 60);
      } else {
        toast.success("Break complete! Ready for another session?");
        setIsBreak(false);
        setTimeLeft(selectedPreset.work * 60);
        setIsRunning(false);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, selectedPreset]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(selectedPreset.work * 60);
  };

  const selectPreset = (preset: typeof PRESETS[0]) => {
    setSelectedPreset(preset);
    setTimeLeft(preset.work * 60);
    setIsRunning(false);
    setIsBreak(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-4xl font-bold text-foreground">Focus Timer</h1>
          <p className="text-muted-foreground">
            {isBreak ? "Break Time" : "Focus Session"}
          </p>
        </div>

        <Card className="p-8 bg-card shadow-soft">
          <div className="text-center space-y-8">
            <div
              className={`text-8xl font-bold transition-all duration-300 ${
                isBreak ? "text-success" : "text-primary"
              }`}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                size="lg"
                onClick={toggleTimer}
                className={`${
                  isBreak
                    ? "bg-gradient-success"
                    : "bg-gradient-primary"
                } hover:opacity-90`}
              >
                {isRunning ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={resetTimer}
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESETS.map((preset) => (
            <Card
              key={preset.name}
              className={`p-6 cursor-pointer transition-all duration-300 ${
                selectedPreset.name === preset.name
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "bg-card hover:shadow-soft"
              }`}
              onClick={() => selectPreset(preset)}
            >
              <h3 className="font-semibold mb-1">{preset.name}</h3>
              <p className={`text-sm ${
                selectedPreset.name === preset.name
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              }`}>
                {preset.work}min / {preset.break}min
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
