"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Calendar as CalendarIcon, Filter, Play, Image as ImageIcon, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const initialContent = [
  { id: "C-1", title: "Diwali Promo Reel", client: "TechNova", platform: "Instagram", type: "Reel", assignedTo: "Jane", date: "Oct 20, 2026", status: "Editing" },
  { id: "C-2", title: "Q3 Insights Carousel", client: "Patel Mfg", platform: "LinkedIn", type: "Carousel", assignedTo: "John", date: "Oct 12, 2026", status: "Client Review" },
  { id: "C-3", title: "Product Launch Video", client: "Singh Builders", platform: "YouTube", type: "Video", assignedTo: "Mike", date: "Oct 25, 2026", status: "Designing" },
  { id: "C-4", title: "Weekend Sale Story", client: "TechNova", platform: "Instagram", type: "Story", assignedTo: "Jane", date: "Oct 10, 2026", status: "Scheduled" },
  { id: "C-5", title: "Employee Spotlight", client: "Desai Architects", platform: "Facebook", type: "Post", assignedTo: "Sarah", date: "Oct 15, 2026", status: "Draft" },
  { id: "C-6", title: "5 Tips for SEO", client: "TSK CRM", platform: "LinkedIn", type: "Post", assignedTo: "John", date: "Oct 18, 2026", status: "Idea" },
];

const statuses = ["Idea", "Draft", "Designing", "Editing", "Client Review", "Scheduled"];

const getTypeIcon = (type: string) => {
  switch(type) {
    case "Reel":
    case "Video":
    case "Short":
      return <Play className="h-3 w-3" />;
    case "Carousel":
    case "Story":
    case "Ad":
      return <ImageIcon className="h-3 w-3" />;
    default:
      return <FileText className="h-3 w-3" />;
  }
};

export default function ContentCalendarPage() {
  const [content, setContent] = useState(initialContent);
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
          <p className="text-muted-foreground">Plan, schedule, and manage marketing content.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button />}>
              <Plus className="mr-2 h-4 w-4" /> Create Content
            </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>New Content Item</DialogTitle>
              <DialogDescription>
                Add a new piece of content to your calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 grid-cols-2">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="E.g. Diwali Promo Reel" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Client</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c1">TechNova</SelectItem>
                    <SelectItem value="c2">Patel Mfg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Type</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Post">Post</SelectItem>
                    <SelectItem value="Reel">Reel</SelectItem>
                    <SelectItem value="Carousel">Carousel</SelectItem>
                    <SelectItem value="Story">Story</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Posting Date</label>
                <Input type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddOpen(false)}>Save to Drafts</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 bg-background p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search content..." className="pl-8" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start min-h-[500px]">
        {statuses.map(status => (
          <div key={status} className="flex-shrink-0 w-[280px] bg-muted/40 rounded-lg p-3 border flex flex-col max-h-full">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-semibold text-sm">{status}</h3>
              <Badge variant="secondary" className="rounded-full w-6 h-6 flex items-center justify-center p-0 text-xs">
                {content.filter(c => c.status === status).length}
              </Badge>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto pr-1 pb-1">
              {content.filter(c => c.status === status).map(item => (
                <div key={item.id} className="bg-background p-3 rounded-md shadow-sm border group cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-medium">
                      {item.platform}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Content</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {statuses.filter(s => s !== item.status).map(s => (
                          <DropdownMenuItem key={s} onClick={() => {
                            setContent(content.map(c => c.id === item.id ? { ...c, status: s } : c));
                          }}>
                            Move to {s}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 leading-snug">{item.title}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    {getTypeIcon(item.type)}
                    <span>{item.type}</span>
                    <span className="mx-1">•</span>
                    <span>{item.client}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-auto pt-3 border-t">
                    <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                      <CalendarIcon className="h-3 w-3" />
                      {item.date}
                    </div>
                    <Avatar className="h-6 w-6 border">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                        {item.assignedTo[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
