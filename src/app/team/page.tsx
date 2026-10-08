"use client";

import { Plus, Search, MoreHorizontal, Mail, Phone, Briefcase, CheckSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const employees = [
  { id: 1, name: "John Doe", role: "Manager", department: "Operations", projects: 4, tasks: 12, performance: 92, email: "john@tskcrm.com", phone: "+91 9876543210" },
  { id: 2, name: "Jane Smith", role: "Sales", department: "Sales", projects: 0, tasks: 24, performance: 88, email: "jane@tskcrm.com", phone: "+91 9876543211" },
  { id: 3, name: "Sarah Lee", role: "Marketing", department: "Marketing", projects: 3, tasks: 8, performance: 95, email: "sarah@tskcrm.com", phone: "+91 9876543212" },
  { id: 4, name: "Mike R.", role: "Video Editor", department: "Production", projects: 2, tasks: 5, performance: 85, email: "mike@tskcrm.com", phone: "+91 9876543213" },
  { id: 5, name: "Alex B.", role: "Designer", department: "Production", projects: 5, tasks: 15, performance: 90, email: "alex@tskcrm.com", phone: "+91 9876543214" },
  { id: 6, name: "Priya K.", role: "Developer", department: "IT", projects: 3, tasks: 10, performance: 96, email: "priya@tskcrm.com", phone: "+91 9876543215" },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Directory</h1>
          <p className="text-muted-foreground">Manage your team members and roles.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-background p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search team members..." className="pl-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <Card key={emp.id} className="relative group overflow-hidden">
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Remove from Team</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardHeader className="text-center pb-2 pt-8">
              <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-background shadow-sm">
                <AvatarFallback className="text-xl bg-primary/10 text-primary font-bold">
                  {emp.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl">{emp.name}</h3>
              <p className="text-sm text-muted-foreground">{emp.role} • {emp.department}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4 my-4">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" title={emp.email}>
                  <Mail className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" title={emp.phone}>
                  <Phone className="h-3 w-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center border-t border-b py-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
                    <Briefcase className="h-3 w-3" /> Projects
                  </p>
                  <p className="font-semibold text-lg">{emp.projects}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
                    <CheckSquare className="h-3 w-3" /> Tasks
                  </p>
                  <p className="font-semibold text-lg">{emp.tasks}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Performance Score</span>
                  <span className="font-medium text-emerald-600">{emp.performance}%</span>
                </div>
                <Progress value={emp.performance} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
