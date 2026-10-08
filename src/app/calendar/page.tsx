"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 8)); // Oct 2026
  const [isAddOpen, setIsAddOpen] = useState(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Mock events
  const events = [
    { day: 10, title: "Design Homepage", type: "task", color: "bg-blue-100 text-blue-800" },
    { day: 15, title: "Client Meeting", type: "meeting", color: "bg-purple-100 text-purple-800" },
    { day: 22, title: "Invoice Due", type: "invoice", color: "bg-rose-100 text-rose-800" },
    { day: 25, title: "Project Deadline", type: "project", color: "bg-emerald-100 text-emerald-800" },
    { day: 8, title: "Team Sync", type: "meeting", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule, tasks, and deadlines.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Title</label>
                <Input placeholder="Enter event title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Type</label>
                <Select defaultValue="meeting">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="project">Project Deadline</SelectItem>
                    <SelectItem value="invoice">Invoice Due</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddOpen(false)}>Save Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="flex-1 min-h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 border-b bg-muted/30">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-muted/10">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b p-2 min-h-[120px] bg-muted/5"></div>
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = events.filter(e => e.day === day && currentDate.getMonth() === 9 && currentDate.getFullYear() === 2026);
            const isToday = day === 8 && currentDate.getMonth() === 9 && currentDate.getFullYear() === 2026;
            
            return (
              <div key={day} className={`border-r border-b p-2 min-h-[120px] ${isToday ? 'bg-primary/5' : 'bg-background'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-primary-foreground' : ''}`}>
                    {day}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayEvents.map((event, idx) => (
                    <div key={idx} className={`text-xs p-1 px-2 rounded-sm truncate ${event.color} cursor-pointer hover:opacity-80 transition-opacity`} title={event.title}>
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* Fill remaining cells to complete the grid */}
          {Array.from({ length: 42 - (firstDayOfMonth + daysInMonth) }).map((_, i) => (
            <div key={`empty-end-${i}`} className="border-r border-b p-2 min-h-[120px] bg-muted/5"></div>
          ))}
        </div>
      </Card>
    </div>
  );
}
