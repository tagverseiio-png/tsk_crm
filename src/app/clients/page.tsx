"use client";

import { useState } from "react";
import { Search, MoreHorizontal, FileText, CheckCircle2, IndianRupee } from "lucide-react";

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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockClients = [
  { id: "1", name: "Ramesh Kumar", company: "Apex Industries", services: "SEO, Web Dev", projects: 2, revenue: "₹3,50,000", outstanding: "₹50,000", status: "Active", accountManager: "John Doe" },
  { id: "2", name: "Sneha Patel", company: "Patel & Co", services: "Social Media", projects: 1, revenue: "₹1,20,000", outstanding: "₹0", status: "Active", accountManager: "Jane Smith" },
  { id: "3", name: "Arjun Singh", company: "Singh Builders", services: "Web Dev", projects: 1, revenue: "₹2,80,000", outstanding: "₹80,000", status: "On Hold", accountManager: "John Doe" },
  { id: "4", name: "Neha Gupta", company: "Gupta Travels", services: "SEO", projects: 3, revenue: "₹4,10,000", outstanding: "₹0", status: "Active", accountManager: "Sarah Lee" },
  { id: "5", name: "Rahul Verma", company: "Verma Logistics", services: "App Dev", projects: 1, revenue: "₹5,00,000", outstanding: "₹2,00,000", status: "Inactive", accountManager: "Jane Smith" },
];

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<any>(null);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Manage your active and past clients.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-background p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border bg-background flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Services</TableHead>
              <TableHead className="text-center">Projects</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Outstanding</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Account Manager</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockClients.map((client) => (
              <Drawer key={client.id}>
                <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => {
                  setSelectedClient(client);
                  document.getElementById(`drawer-trigger-client-${client.id}`)?.click();
                }}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.company}</TableCell>
                    <TableCell>{client.services}</TableCell>
                    <TableCell className="text-center">{client.projects}</TableCell>
                    <TableCell>{client.revenue}</TableCell>
                    <TableCell className={client.outstanding !== "₹0" ? "text-rose-500 font-medium" : "text-emerald-500 font-medium"}>
                      {client.outstanding}
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.accountManager}</TableCell>
                    <TableCell>
                      <DrawerTrigger id={`drawer-trigger-client-${client.id}`} render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DrawerTrigger>
                    </TableCell>
                  </TableRow>
                <DrawerContent className="h-[85vh]">
                  <div className="mx-auto w-full max-w-5xl flex flex-col h-full">
                    <DrawerHeader className="border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <DrawerTitle className="text-2xl">{client.company}</DrawerTitle>
                          <DrawerDescription className="text-base mt-1">
                            Contact: {client.name} • Account Manager: {client.accountManager}
                          </DrawerDescription>
                        </div>
                        <Badge variant={client.status === 'Active' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                          {client.status}
                        </Badge>
                      </div>
                    </DrawerHeader>
                    <div className="flex-1 overflow-auto p-4 lg:p-6">
                      <Tabs defaultValue="overview" className="h-full flex flex-col">
                        <TabsList className="w-full justify-start border-b rounded-none pb-px bg-transparent h-auto p-0 space-x-6">
                          {['overview', 'projects', 'invoices', 'tasks', 'activity'].map(tab => (
                            <TabsTrigger 
                              key={tab}
                              value={tab} 
                              className="capitalize rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 pt-2"
                            >
                              {tab}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        
                        <TabsContent value="overview" className="mt-6 flex-1">
                          <div className="grid gap-4 md:grid-cols-3 mb-6">
                            <Card>
                              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">{client.revenue}</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold text-rose-500">{client.outstanding}</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">{client.projects}</div>
                              </CardContent>
                            </Card>
                          </div>
                          <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Client Details</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-y-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="text-sm font-medium">contact@{client.company.toLowerCase().replace(/\s+/g, '')}.com</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="text-sm font-medium">+91 98765 43210</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <p className="text-sm font-medium">123 Business Park, Mumbai</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Services Subscribed</p>
                                    <p className="text-sm font-medium">{client.services}</p>
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
                                    { title: "Payment received", time: "2 days ago", type: "success" },
                                    { title: "Invoice #INV-2023 generated", time: "5 days ago", type: "info" },
                                    { title: "Project kick-off meeting", time: "1 week ago", type: "default" }
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
                        <TabsContent value="projects" className="mt-6 flex-1 flex items-center justify-center text-muted-foreground">
                          Projects table will be displayed here
                        </TabsContent>
                        <TabsContent value="invoices" className="mt-6 flex-1 flex items-center justify-center text-muted-foreground">
                          Invoices history will be displayed here
                        </TabsContent>
                        <TabsContent value="tasks" className="mt-6 flex-1 flex items-center justify-center text-muted-foreground">
                          Client-specific tasks will be displayed here
                        </TabsContent>
                        <TabsContent value="activity" className="mt-6 flex-1 flex items-center justify-center text-muted-foreground">
                          Full activity timeline will be displayed here
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
