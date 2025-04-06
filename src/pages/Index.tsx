
import { PomodoroTimer } from "@/components/pomodoro/PomodoroTimer";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { DailyGoals } from "@/components/goals/DailyGoals";

export default function Index() {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-500">{today}</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div>
          <PomodoroTimer />
        </div>
        <div>
          <MusicPlayer />
        </div>
      </div>

      <div className="mt-6">
        <DailyGoals />
      </div>
    </div>
  );
}
