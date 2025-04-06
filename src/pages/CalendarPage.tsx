
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly sync up with the team",
      date: new Date(),
    },
    {
      id: "2",
      title: "Project Deadline",
      description: "Final submission of the project",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
  ]);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const handleAddEvent = () => {
    if (!selectedDate || !newEventTitle.trim()) return;

    const newEvent: Event = {
      id: Date.now().toString(),
      title: newEventTitle.trim(),
      description: newEventDescription.trim(),
      date: selectedDate,
    };

    setEvents([...events, newEvent]);
    setNewEventTitle("");
    setNewEventDescription("");
    setIsAddEventOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const eventsForSelectedDate = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="container mx-auto py-6 flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 flex-1">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
                classNames={{
                  day_today: "bg-dashboard-lightpurple text-dashboard-purple font-bold",
                  day_selected: "bg-dashboard-purple text-primary-foreground",
                }}
                components={{
                  DayContent: ({ day }) => {
                    const date = day.date;
                    const eventsForThisDate = getEventsForDate(date);
                    
                    return (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {day.day}
                        {eventsForThisDate.length > 0 && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-dashboard-blue rounded-full"></div>
                        )}
                      </div>
                    );
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 flex flex-col">
          <Card className="flex-1">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle>
                {selectedDate ? formatDate(selectedDate) : "Select a date"}
              </CardTitle>
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-dashboard-blue hover:bg-dashboard-blue/90">
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Title</label>
                      <Input
                        placeholder="Enter event title"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Enter event description (optional)"
                        value={newEventDescription}
                        onChange={(e) => setNewEventDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <div className="p-2 border rounded-md">
                        {selectedDate
                          ? formatDate(selectedDate)
                          : "No date selected"}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      onClick={handleAddEvent}
                      disabled={!newEventTitle.trim() || !selectedDate}
                      className="bg-dashboard-blue hover:bg-dashboard-blue/90"
                    >
                      Add Event
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {eventsForSelectedDate.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-slate-500 mb-4">No events for this date</p>
                  <Button 
                    onClick={() => setIsAddEventOpen(true)}
                    className="bg-dashboard-blue hover:bg-dashboard-blue/90"
                  >
                    Add Your First Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {eventsForSelectedDate.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-md border p-4 hover:shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{event.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
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
                            className="h-4 w-4"
                          >
                            <line x1="18" x2="6" y1="6" y2="18"></line>
                            <line x1="6" x2="18" y1="6" y2="18"></line>
                          </svg>
                        </Button>
                      </div>
                      {event.description && (
                        <p className="text-sm text-slate-500 mt-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
