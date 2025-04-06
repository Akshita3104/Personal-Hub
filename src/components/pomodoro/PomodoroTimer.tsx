
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TimerMode = "focus" | "short" | "long";

const TIMER_CONFIG = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export const PomodoroTimer = () => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(TIMER_CONFIG[mode]);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle mode change
  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_CONFIG[newMode]);
    setIsActive(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Handle timer toggle
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(TIMER_CONFIG[mode]);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Timer effect
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            if (mode === "focus") {
              setCompletedPomodoros((prev) => prev + 1);
            }
            setIsActive(false);
            window.clearInterval(timerRef.current as number);
            timerRef.current = null;
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isActive, mode]);

  // Progress calculation
  const progress = (1 - timeLeft / TIMER_CONFIG[mode]) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="focus" className="mb-4" onValueChange={(val) => handleModeChange(val as TimerMode)}>
          <TabsList className="w-full">
            <TabsTrigger value="focus" className="flex-1">Focus</TabsTrigger>
            <TabsTrigger value="short" className="flex-1">Short Break</TabsTrigger>
            <TabsTrigger value="long" className="flex-1">Long Break</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative flex h-48 w-48 items-center justify-center rounded-full mx-auto mb-6">
          <svg className="absolute h-full w-full" viewBox="0 0 100 100">
            <circle
              className="stroke-slate-100"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              strokeWidth="8"
            />
            <circle
              className="stroke-dashboard-purple transition-all duration-300"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              strokeWidth="8"
              strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="text-4xl font-semibold">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <Button 
            onClick={toggleTimer} 
            className={isActive ? "bg-destructive hover:bg-destructive/90" : "bg-dashboard-purple hover:bg-dashboard-purple/90"}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button 
            onClick={resetTimer} 
            variant="outline"
            className="border-dashboard-purple text-dashboard-purple hover:bg-dashboard-lightpurple"
          >
            Reset
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-center text-sm text-slate-500">
          <span>Completed today: {completedPomodoros}</span>
        </div>
      </CardContent>
    </Card>
  );
};
