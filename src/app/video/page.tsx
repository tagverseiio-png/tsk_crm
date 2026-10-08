"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Video, Clock, MessageSquare, AlertCircle } from "lucide-react";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const initialVideos = [
  { id: "V-1", title: "Corporate Overview 2026", client: "TechNova", platform: "YouTube", editor: "Mike R.", deadline: "Oct 25, 2026", revisions: 0, status: "IDEA" },
  { id: "V-2", title: "Product Teaser", client: "Patel Mfg", platform: "Instagram", editor: "Sarah L.", deadline: "Oct 15, 2026", revisions: 1, status: "EDITING" },
  { id: "V-3", title: "Client Testimonial", client: "Desai Arch", platform: "LinkedIn", editor: "Mike R.", deadline: "Oct 10, 2026", revisions: 2, status: "CLIENT APPROVAL" },
  { id: "V-4", title: "How-to Guide", client: "Singh Builders", platform: "YouTube", editor: "Jane S.", deadline: "Oct 05, 2026", revisions: 0, status: "PUBLISHED" },
  { id: "V-5", title: "Behind the Scenes", client: "Reddy Designs", platform: "TikTok", editor: "Sarah L.", deadline: "Oct 18, 2026", revisions: 0, status: "RAW FOOTAGE" },
];

const workflowSteps = [
  "IDEA", "SCRIPT", "SHOOT", "RAW FOOTAGE", "EDITING", "REVIEW", "CLIENT APPROVAL", "FINAL", "PUBLISHED"
];

const getStatusColor = (status: string) => {
  if (status === "PUBLISHED") return "border-emerald-500 bg-emerald-50/50";
  if (status === "CLIENT APPROVAL") return "border-purple-500 bg-purple-50/50";
  if (status === "EDITING") return "border-blue-500 bg-blue-50/50";
  return "border-border bg-background";
};

export default function VideoProductionPage() {
  const [videos, setVideos] = useState(initialVideos);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Production</h1>
          <p className="text-muted-foreground">Manage the entire video creation workflow.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Video Project
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-background p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search video projects..." className="pl-8" />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start min-h-[600px] snap-x">
        {workflowSteps.map(step => (
          <div key={step} className="flex-shrink-0 w-[300px] bg-muted/30 rounded-lg p-3 border flex flex-col max-h-full snap-start">
            <div className="flex items-center justify-between mb-4 px-1 border-b pb-2">
              <h3 className="font-bold text-xs tracking-wider text-muted-foreground">{step}</h3>
              <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-0.5 rounded-full border">
                {videos.filter(v => v.status === step).length}
              </span>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto pr-1 pb-1">
              {videos.filter(v => v.status === step).map(video => (
                <div key={video.id} className={`p-4 rounded-md shadow-sm border-l-4 group cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${getStatusColor(video.status)}`}>
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="text-[10px] bg-background">
                      {video.platform}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {workflowSteps.map(s => (
                          <DropdownMenuItem key={s} disabled={s === video.status} onClick={() => {
                            setVideos(videos.map(v => v.id === video.id ? { ...v, status: s } : v));
                          }}>
                            Move to {s}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 leading-snug">{video.title}</h4>
                  <p className="text-xs text-muted-foreground mb-4">{video.client}</p>
                  
                  <div className="flex justify-between items-center text-xs pt-3 border-t border-border/50">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="flex items-center gap-1" title="Deadline">
                        <Clock className={`h-3 w-3 ${video.deadline < 'Oct 15, 2026' ? 'text-rose-500' : ''}`} />
                        <span className={video.deadline < 'Oct 15, 2026' ? 'text-rose-500 font-medium' : ''}>{new Date(video.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      {video.revisions > 0 && (
                        <div className="flex items-center gap-1 text-orange-500" title="Revisions">
                          <AlertCircle className="h-3 w-3" />
                          <span>{video.revisions}</span>
                        </div>
                      )}
                    </div>
                    <Avatar className="h-6 w-6 border" title={`Editor: ${video.editor}`}>
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                        {video.editor.split(' ')[0][0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full justify-start text-xs text-muted-foreground h-8 mt-1 border border-dashed border-transparent hover:border-muted-foreground/30">
                <Plus className="mr-2 h-3 w-3" /> Add video
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
