"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Calendar as CalendarIcon, Phone, Mail, MessageSquare, Briefcase, FileText, IndianRupee, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Card, CardContent } from "@/components/ui/card";

const mockFollowUps = [
  { id: "1", client: "TechNova Solutions", type: "Call", date: "Today", time: "11:00 AM", assignedTo: "John Doe", priority: "High", status: "Pending", category: "today" },
  { id: "2", client: "Patel Manufacturing", type: "Meeting", date: "Today", time: "02:30 PM", assignedTo: "Jane Smith", priority: "Medium", status: "Pending", category: "today" },
  { id: "3", client: "Desai Architects", type: "WhatsApp", date: "Yesterday", time: "05:00 PM", assignedTo: "Sarah Lee", priority: "High", status: "Overdue", category: "overdue" },
  { id: "4", client: "Singh Builders", type: "Proposal", date: "2 days ago", time: "10:00 AM", assignedTo: "John Doe", priority: "Medium", status: "Overdue", category: "overdue" },
  { id: "5", client: "Reddy Designs", type: "Email", date: "Tomorrow", time: "09:00 AM", assignedTo: "Jane Smith", priority: "Low", status: "Upcoming", category: "upcoming" },
  { id: "6", client: "Apex Industries", type: "Payment", date: "Next Week", time: "12:00 PM", assignedTo: "John Doe", priority: "High", status: "Upcoming", category: "upcoming" },
];

const getTypeIcon = (type: string) => {
  switch(type) {
    case "Call": return <Phone className="h-4 w-4" />;
    case "WhatsApp": return <MessageSquare className="h-4 w-4" />;
    case "Email": return <Mail className="h-4 w-4" />;
    case "Meeting": return <Briefcase className="h-4 w-4" />;
    case "Proposal": return <FileText className="h-4 w-4" />;
    case "Payment": return <IndianRupee className="h-4 w-4" />;
    case "Renewal": return <RefreshCw className="h-4 w-4" />;
    default: return <CalendarIcon className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch(priority) {
    case "High": return "bg-rose-100 text-rose-800 border-rose-200";
    case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Low": return "bg-blue-100 text-blue-800 border-blue-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function FollowUpsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredFollowUps = activeTab === "all" 
    ? mockFollowUps 
    : mockFollowUps.filter(f => f.category === activeTab);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Follow-ups</h1>
          <p className="text-muted-foreground">Don't let any client slip through the cracks.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button />}>
              <Plus className="mr-2 h-4 w-4" /> Add Follow-up
            </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Follow-up</DialogTitle>
              <DialogDescription>
                Schedule a new follow-up with a lead or client.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 grid-cols-2">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Client / Lead</label>
                <Input placeholder="Search client name..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select defaultValue="Call">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Call", "WhatsApp", "Email", "Meeting", "Proposal", "Payment", "Renewal"].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select defaultValue="Medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input type="time" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddOpen(false)}>Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-rose-50/50 border-rose-100">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-rose-800 mb-1">Overdue</p>
              <p className="text-2xl font-bold text-rose-900">2</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50/50 border-blue-100">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">Today's</p>
              <p className="text-2xl font-bold text-blue-900">2</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50/50 border-emerald-100">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-emerald-800 mb-1">Upcoming</p>
              <p className="text-2xl font-bold text-emerald-900">2</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Follow-ups</TabsTrigger>
            <TabsTrigger value="overdue" className="text-rose-600 data-[state=active]:text-rose-700 data-[state=active]:bg-rose-100">Overdue</TabsTrigger>
            <TabsTrigger value="today" className="text-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-blue-100">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search follow-ups..." className="pl-8 h-9" />
          </div>
        </div>

        <div className="rounded-md border bg-background mt-4 flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFollowUps.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.client}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {getTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={item.category === 'overdue' ? 'text-rose-600 font-medium' : ''}>{item.date}</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Overdue' ? 'destructive' : item.status === 'Pending' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="text-emerald-600 font-medium">Mark as Complete</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Tabs>
    </div>
  );
}
