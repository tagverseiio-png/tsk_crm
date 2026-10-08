"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, LayoutGrid, List, Calendar as CalendarIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialTasks = [
  { id: "TSK-001", name: "Design Homepage Wireframes", project: "E-Commerce Redesign", client: "TechNova Solutions", assignedTo: "Jane Smith", priority: "High", dueDate: "Oct 10, 2026", status: "To Do" },
  { id: "TSK-002", name: "Setup Google Analytics", project: "Social Media Campaign", client: "Patel Manufacturing", assignedTo: "Sarah Lee", priority: "Medium", dueDate: "Oct 12, 2026", status: "To Do" },
  { id: "TSK-003", name: "Draft Storyboard", project: "Corporate Video", client: "Desai Architects", assignedTo: "John Doe", priority: "High", dueDate: "Oct 15, 2026", status: "In Progress" },
  { id: "TSK-004", name: "API Integration", project: "Mobile App", client: "Singh Builders", assignedTo: "Dev Team", priority: "High", dueDate: "Oct 08, 2026", status: "Review" },
  { id: "TSK-005", name: "Keyword Research", project: "SEO Optimization", client: "Reddy Designs", assignedTo: "Sarah Lee", priority: "Low", dueDate: "Oct 20, 2026", status: "Completed" },
  { id: "TSK-006", name: "Write Ad Copy", project: "Social Media Campaign", client: "Patel Manufacturing", assignedTo: "Jane Smith", priority: "Medium", dueDate: "Oct 11, 2026", status: "In Progress" },
];

const statuses = ["To Do", "In Progress", "Review", "Completed"];

const getPriorityColor = (priority: string) => {
  switch(priority) {
    case "High": return "bg-rose-100 text-rose-800 hover:bg-rose-100";
    case "Medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "Low": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState<"kanban" | "list" | "calendar">("kanban");
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your team's to-dos and workflows.</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "list" | "calendar")} className="w-[180px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="kanban" title="Kanban"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
              <TabsTrigger value="list" title="List"><List className="h-4 w-4" /></TabsTrigger>
              <TabsTrigger value="calendar" title="Calendar"><CalendarIcon className="h-4 w-4" /></TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger render={<Button />}>
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task and assign it to your team.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 grid-cols-2">
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Task Name</label>
                  <Input placeholder="E.g. Update Hero Image" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p1">E-Commerce Redesign</SelectItem>
                      <SelectItem value="p2">Social Media Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assignee</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select assignee" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="u1">Jane Smith</SelectItem>
                      <SelectItem value="u2">John Doe</SelectItem>
                      <SelectItem value="u3">Sarah Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select defaultValue="Medium">
                    <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <Input type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddOpen(false)}>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-background p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all-projects">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-projects">All Projects</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-assignees">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-assignees">All Assignees</SelectItem>
              <SelectItem value="me">Assigned to me</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {view === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start min-h-[500px]">
          {statuses.map(status => (
            <div key={status} className="flex-shrink-0 w-80 bg-muted/40 rounded-lg p-3 border flex flex-col max-h-full">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-semibold text-sm">{status}</h3>
                <Badge variant="secondary" className="rounded-full w-6 h-6 flex items-center justify-center p-0">
                  {tasks.filter(t => t.status === status).length}
                </Badge>
              </div>
              <div className="flex flex-col gap-3 overflow-y-auto pr-1 pb-1">
                {tasks.filter(t => t.status === status).map(task => (
                  <div key={task.id} className="bg-background p-4 rounded-md shadow-sm border group cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                            <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-xs text-muted-foreground">Move to...</DropdownMenuLabel>
                          {statuses.filter(s => s !== task.status).map(s => (
                            <DropdownMenuItem key={s} onClick={() => {
                              setTasks(tasks.map(t => t.id === task.id ? { ...t, status: s } : t));
                            }}>
                              {s}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{task.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1" title={`${task.project} - ${task.client}`}>
                      {task.project}
                    </p>
                    <div className="flex justify-between items-center text-xs mt-auto pt-3 border-t">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className={task.dueDate < 'Oct 10, 2026' ? 'text-red-500 font-medium' : ''}>{task.dueDate}</span>
                      </div>
                      <Avatar className="h-6 w-6 border">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium">
                          {task.assignedTo.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full justify-start text-muted-foreground h-9 mt-1" onClick={() => setIsAddOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add task
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "list" && (
        <div className="rounded-md border bg-background flex-1 flex items-center justify-center text-muted-foreground">
          List view will be displayed here.
        </div>
      )}

      {view === "calendar" && (
        <div className="rounded-md border bg-background flex-1 flex items-center justify-center text-muted-foreground">
          Calendar view will be displayed here.
        </div>
      )}
    </div>
  );
}
