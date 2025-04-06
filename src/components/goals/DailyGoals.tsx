
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export const DailyGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", text: "Complete pomodoro session", completed: false },
    { id: "2", text: "Review today's tasks", completed: true },
    { id: "3", text: "Prepare for tomorrow", completed: false },
  ]);
  const [newGoalText, setNewGoalText] = useState("");

  const addGoal = () => {
    if (!newGoalText.trim()) return;
    
    const newGoal: Goal = {
      id: Date.now().toString(),
      text: newGoalText.trim(),
      completed: false,
    };
    
    setGoals([...goals, newGoal]);
    setNewGoalText("");
  };

  const toggleGoal = (id: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  // Progress calculation
  const completedCount = goals.filter((goal) => goal.completed).length;
  const totalCount = goals.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Daily Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Input
            placeholder="Add a new goal..."
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addGoal();
              }
            }}
            className="flex-1"
          />
          <Button 
            onClick={addGoal} 
            disabled={!newGoalText.trim()}
            className="bg-dashboard-purple hover:bg-dashboard-purple/90"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span>Progress: {completedCount}/{totalCount}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-dashboard-purple transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {goals.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500">
            No goals set for today. Add some goals to get started!
          </div>
        ) : (
          <ul className="space-y-2">
            {goals.map((goal) => (
              <li
                key={goal.id}
                className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`goal-${goal.id}`}
                    checked={goal.completed}
                    onCheckedChange={() => toggleGoal(goal.id)}
                  />
                  <label
                    htmlFor={`goal-${goal.id}`}
                    className={`text-sm ${goal.completed ? "line-through text-slate-400" : ""}`}
                  >
                    {goal.text}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGoal(goal.id)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <line x1="18" x2="6" y1="6" y2="18"></line>
                    <line x1="6" x2="18" y1="6" y2="18"></line>
                  </svg>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
