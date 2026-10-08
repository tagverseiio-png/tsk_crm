"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, LayoutGrid, List } from "lucide-react";

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

const mockLeads = [
  { id: "1", name: "Rahul Sharma", company: "TechNova Solutions", source: "Website", service: "Web Dev", value: "₹2,50,000", status: "New", assignedTo: "John Doe", lastContact: "2 hours ago", nextFollowUp: "Tomorrow" },
  { id: "2", name: "Priya Desai", company: "Desai Architects", source: "Referral", service: "SEO", value: "₹75,000", status: "Contacted", assignedTo: "Jane Smith", lastContact: "Yesterday", nextFollowUp: "Today" },
  { id: "3", name: "Amit Patel", company: "Patel Manufacturing", source: "LinkedIn", service: "App Dev", value: "₹4,20,000", status: "Proposal", assignedTo: "John Doe", lastContact: "3 days ago", nextFollowUp: "Next Week" },
  { id: "4", name: "Sneha Reddy", company: "Reddy Designs", source: "Instagram", service: "Social Media", value: "₹45,000", status: "Negotiation", assignedTo: "Sarah Lee", lastContact: "Today", nextFollowUp: "Tomorrow" },
  { id: "5", name: "Vikram Singh", company: "Singh Logistics", source: "Cold Call", service: "Software", value: "₹1,80,000", status: "Qualified", assignedTo: "John Doe", lastContact: "1 week ago", nextFollowUp: "Today" },
];

const statuses = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

export default function LeadsPage() {
  const [leads, setLeads] = useState(mockLeads);
  const [view, setView] = useState<"table" | "kanban">("table");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "New": return "bg-blue-100 text-blue-800";
      case "Contacted": return "bg-yellow-100 text-yellow-800";
      case "Qualified": return "bg-purple-100 text-purple-800";
      case "Proposal": return "bg-orange-100 text-orange-800";
      case "Negotiation": return "bg-pink-100 text-pink-800";
      case "Won": return "bg-green-100 text-green-800";
      case "Lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Manage and track your potential clients.</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "table" | "kanban")} className="w-[120px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table"><List className="h-4 w-4" /></TabsTrigger>
              <TabsTrigger value="kanban"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger render={<Button />}>
                <Plus className="mr-2 h-4 w-4" /> Add Lead
              </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Enter the details of the new lead. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="E.g. Rahul Sharma" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input placeholder="E.g. TechNova Solutions" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="rahul@example.com" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service</label>
                  <Input placeholder="E.g. Web Development" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue="New">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddOpen(false)}>Save Lead</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-background p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {view === "table" ? (
        <div className="rounded-md border bg-background flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Next Follow-up</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.service}</TableCell>
                  <TableCell>{lead.value}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell>{lead.nextFollowUp}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                        <DropdownMenuItem>Add Follow-up</DropdownMenuItem>
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
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start h-[calc(100vh-250px)]">
          {statuses.map(status => (
            <div key={status} className="flex-shrink-0 w-80 bg-muted/40 rounded-lg p-3 border flex flex-col max-h-full">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-semibold text-sm">{status}</h3>
                <Badge variant="secondary" className="rounded-full w-6 h-6 flex items-center justify-center p-0">
                  {leads.filter(l => l.status === status).length}
                </Badge>
              </div>
              <div className="flex flex-col gap-3 overflow-y-auto pr-1">
                {leads.filter(l => l.status === status).map(lead => (
                  <div key={lead.id} className="bg-background p-3 rounded-md shadow-sm border text-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{lead.name}</span>
                      <span className="text-xs text-muted-foreground">{lead.value}</span>
                    </div>
                    <div className="text-muted-foreground text-xs mb-3">{lead.company}</div>
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium" style={{ fontSize: '10px' }}>
                          {lead.assignedTo.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-muted-foreground">{lead.nextFollowUp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
