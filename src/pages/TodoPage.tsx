
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default function TodoPage() {
  return (
    <div className="container mx-auto py-6 flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <div className="flex-1">
        <KanbanBoard />
      </div>
    </div>
  );
}
