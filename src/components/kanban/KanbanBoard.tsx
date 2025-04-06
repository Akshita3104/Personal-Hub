
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "task-1", content: "Complete project proposal" },
        { id: "task-2", content: "Research competitors" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        { id: "task-3", content: "Design mockups" },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        { id: "task-4", content: "Project kickoff meeting" },
      ],
    },
  ]);

  const [newTaskContent, setNewTaskContent] = useState("");
  const [draggedTask, setDraggedTask] = useState<{ task: Task; columnId: string } | null>(null);

  const addTask = (columnId: string) => {
    if (!newTaskContent.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      content: newTaskContent.trim(),
    };

    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
    setNewTaskContent("");
  };

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, columnId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: string) => {
    if (draggedTask) {
      const { task, columnId: sourceColumnId } = draggedTask;

      // Remove task from the source column
      const sourceColumn = columns.find((col) => col.id === sourceColumnId);
      if (!sourceColumn) return;

      const updatedColumns = columns.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((t) => t.id !== task.id),
          };
        }
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, task],
          };
        }
        return column;
      });

      setColumns(updatedColumns);
      setDraggedTask(null);
    }
  };

  const removeTask = (taskId: string, columnId: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
          : column
      )
    );
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="rounded-md border border-slate-200 bg-slate-50/50"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              <div className="p-3 border-b bg-white">
                <h3 className="font-medium">{column.title}</h3>
                <div className="text-xs text-slate-500">{column.tasks.length} tasks</div>
              </div>

              <div className="p-3 space-y-2">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    className="rounded-md border bg-white p-3 shadow-sm cursor-move"
                  >
                    <div className="flex justify-between">
                      <span className="text-sm">{task.content}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTask(task.id, column.id)}
                        className="h-4 w-4 p-0 text-slate-400 hover:text-slate-600"
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
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={`Add to ${column.title.toLowerCase()}...`}
                    value={newTaskContent}
                    onChange={(e) => setNewTaskContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTask(column.id);
                      }
                    }}
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={() => addTask(column.id)}
                    disabled={!newTaskContent.trim()}
                    size="sm"
                    className="bg-dashboard-blue hover:bg-dashboard-blue/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
