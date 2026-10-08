"use client";

import { useState } from "react";
import { Search, MoreHorizontal, FileText, CheckCircle2, Clock, Plus, LayoutGrid, List } from "lucide-react";

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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mockProjects = [
  { id: "PRJ-01", name: "E-Commerce Website Redesign", client: "TechNova Solutions", service: "Web Dev", manager: "John Doe", progress: 75, deadline: "Oct 25, 2026", budget: "₹2,50,000", status: "Active" },
  { id: "PRJ-02", name: "Social Media Campaign Q4", client: "Patel Manufacturing", service: "Marketing", manager: "Sarah Lee", progress: 30, deadline: "Nov 15, 2026", budget: "₹75,000", status: "Active" },
  { id: "PRJ-03", name: "Corporate Video Production", client: "Desai Architects", service: "Video", manager: "Jane Smith", progress: 0, deadline: "Dec 01, 2026", budget: "₹1,20,000", status: "Planning" },
  { id: "PRJ-04", name: "Mobile App Development", client: "Singh Builders", service: "App Dev", manager: "John Doe", progress: 100, deadline: "Sep 30, 2026", budget: "₹4,00,000", status: "Completed" },
  { id: "PRJ-05", name: "SEO Optimization 6M", client: "Reddy Designs", service: "SEO", manager: "Sarah Lee", progress: 50, deadline: "Jan 10, 2027", budget: "₹90,000", status: "Review" },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case "Active": return "bg-blue-100 text-blue-800 border-blue-200";
    case "Planning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Review": return "bg-purple-100 text-purple-800 border-purple-200";
    case "Completed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "On Hold": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage ongoing work and team assignments.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-background p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-8" />
        </div>
        <Tabs defaultValue="all" className="w-[300px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProjects.filter(p => p.status === 'Active').slice(0, 3).map((project) => (
          <Card key={project.id} className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className={getStatusColor(project.status)}>{project.status}</Badge>
                <span className="text-xs text-muted-foreground font-medium">{project.id}</span>
              </div>
              <CardTitle className="text-lg mt-2">{project.name}</CardTitle>
              <CardDescription>{project.client}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className={project.progress < 100 ? "text-primary font-medium" : "text-muted-foreground"}>{project.deadline}</span>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-800 border-2 border-white z-10" title={project.manager}>
                      {project.manager.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-md border bg-background flex-1 mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead className="w-[150px]">Progress</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProjects.map((project) => (
              <Drawer key={project.id}>
                <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => {
                  setSelectedProject(project);
                  document.getElementById(`drawer-trigger-proj-${project.id}`)?.click();
                }}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{project.manager}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-8">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{project.deadline}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DrawerTrigger id={`drawer-trigger-proj-${project.id}`} render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DrawerTrigger>
                    </TableCell>
                  </TableRow>
                <DrawerContent className="h-[90vh]">
                  <div className="mx-auto w-full max-w-6xl flex flex-col h-full">
                    <DrawerHeader className="border-b px-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-medium text-muted-foreground">{project.id}</span>
                            <Badge variant="outline" className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </div>
                          <DrawerTitle className="text-3xl">{project.name}</DrawerTitle>
                          <DrawerDescription className="text-base mt-1">
                            Client: <span className="font-medium text-foreground">{project.client}</span> • Service: {project.service}
                          </DrawerDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">Edit Details</Button>
                          <Button>Complete Project</Button>
                        </div>
                      </div>
                    </DrawerHeader>
                    <div className="flex-1 overflow-auto bg-muted/10">
                      <Tabs defaultValue="overview" className="h-full flex flex-col">
                        <TabsList className="w-full justify-start border-b rounded-none pb-px bg-white px-6 h-12 space-x-6 sticky top-0 z-10">
                          {['overview', 'tasks', 'content', 'files', 'invoices', 'activity'].map(tab => (
                            <TabsTrigger 
                              key={tab}
                              value={tab} 
                              className="capitalize rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 pt-3 font-medium"
                            >
                              {tab}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        
                        <TabsContent value="overview" className="p-6 mt-0">
                          <div className="grid gap-6 md:grid-cols-3 mb-6">
                            <Card>
                              <CardContent className="p-6">
                                <p className="text-sm font-medium text-muted-foreground mb-1">Project Progress</p>
                                <div className="flex items-end justify-between mb-2">
                                  <span className="text-3xl font-bold">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2" />
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-6">
                                <p className="text-sm font-medium text-muted-foreground mb-1">Deadline</p>
                                <div className="text-3xl font-bold">{project.deadline}</div>
                                <p className="text-sm text-primary mt-2">17 days remaining</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-6">
                                <p className="text-sm font-medium text-muted-foreground mb-1">Budget Used</p>
                                <div className="text-3xl font-bold">₹1,25,000</div>
                                <p className="text-sm text-muted-foreground mt-2">of {project.budget} (50%)</p>
                              </CardContent>
                            </Card>
                          </div>
                          <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Project Details</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-y-6">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Project Manager</p>
                                    <p className="text-sm font-medium mt-1">{project.manager}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Team Size</p>
                                    <p className="text-sm font-medium mt-1">4 Members</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Start Date</p>
                                    <p className="text-sm font-medium mt-1">Sep 15, 2026</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Priority</p>
                                    <p className="text-sm font-medium mt-1 text-rose-500">High</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Recent Activity</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-6">
                                  {[
                                    { title: "Task 'Wireframes' completed by Jane", time: "2 hours ago", type: "success" },
                                    { title: "Invoice #INV-2023-005 paid", time: "1 day ago", type: "info" },
                                    { title: "Client approved design drafts", time: "3 days ago", type: "default" }
                                  ].map((activity, i) => (
                                    <div key={i} className="flex gap-4">
                                      <div className="mt-0.5">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium">{activity.title}</span>
                                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                        
                        {/* Placeholders for other tabs */}
                        <TabsContent value="tasks" className="mt-0 p-6 flex-1 flex flex-col">
                           <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">Project Tasks</h3>
                              <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Add Task</Button>
                           </div>
                           <div className="border rounded-md bg-white text-center p-12 text-muted-foreground">
                              Task Kanban board for this specific project will appear here.
                           </div>
                        </TabsContent>
                        <TabsContent value="content" className="mt-0 p-6 flex-1 text-center text-muted-foreground">
                          Content items linked to this project will be displayed here.
                        </TabsContent>
                        <TabsContent value="files" className="mt-0 p-6 flex-1 text-center text-muted-foreground">
                          Project assets, documents, and deliverables will be displayed here.
                        </TabsContent>
                        <TabsContent value="invoices" className="mt-0 p-6 flex-1 text-center text-muted-foreground">
                          Invoices related to this project will be displayed here.
                        </TabsContent>
                        <TabsContent value="activity" className="mt-0 p-6 flex-1 text-center text-muted-foreground">
                          Full activity audit log will be displayed here.
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
