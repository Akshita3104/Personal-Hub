
import { NoteEditor } from "@/components/notes/NoteEditor";

export default function NotesPage() {
  return (
    <div className="container mx-auto py-6 flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      <div className="flex-1">
        <NoteEditor />
      </div>
    </div>
  );
}
