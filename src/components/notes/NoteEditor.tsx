
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export const NoteEditor = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Meeting notes",
      content: "Discuss project timeline and deliverables with team.",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Ideas for new feature",
      content: "Add dark mode support and user preferences.",
      createdAt: new Date(),
    },
  ]);

  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createdAt: new Date(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setTitle(newNote.title);
    setContent(newNote.content);
  };

  const handleSaveNote = () => {
    if (!activeNote) return;

    const updatedNotes = notes.map((note) =>
      note.id === activeNote.id
        ? { ...note, title, content }
        : note
    );

    setNotes(updatedNotes);
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);

    if (activeNote && activeNote.id === noteId) {
      setActiveNote(updatedNotes[0] || null);
      setTitle(updatedNotes[0]?.title || "");
      setContent(updatedNotes[0]?.content || "");
    }
  };

  const handleSelectNote = (note: Note) => {
    setActiveNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Notes</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex gap-4">
        <div className="w-1/3 border-r pr-4">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="font-medium">All Notes</h3>
            <Button onClick={handleAddNote} size="sm" className="bg-dashboard-blue hover:bg-dashboard-blue/90">
              <Plus className="h-4 w-4 mr-1" /> New
            </Button>
          </div>

          <div className="space-y-2">
            {notes.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No notes yet. Create one to get started.
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className={`cursor-pointer rounded-md border p-3 ${
                    activeNote?.id === note.id
                      ? "border-dashboard-blue bg-dashboard-lightblue"
                      : "hover:bg-slate-50"
                  }`}
                  onClick={() => handleSelectNote(note)}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium truncate">{note.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className="h-5 w-5 p-0 text-slate-400 hover:text-slate-600"
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
                  <p className="text-xs text-slate-500 truncate mt-1">
                    {note.content || "Empty note"}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {formatDate(note.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-2/3 flex flex-col">
          {activeNote ? (
            <>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="mb-3 text-lg font-medium"
              />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                className="flex-1 min-h-[200px] resize-none"
              />
              <div className="mt-3 flex justify-end">
                <Button onClick={handleSaveNote} className="bg-dashboard-blue hover:bg-dashboard-blue/90">
                  Save
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-500 mb-3">Select a note or create a new one</p>
                <Button onClick={handleAddNote} className="bg-dashboard-blue hover:bg-dashboard-blue/90">
                  <Plus className="h-4 w-4 mr-1" /> Create Note
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
