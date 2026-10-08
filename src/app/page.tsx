"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Building2,
  Briefcase,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 400000, expenses: 240000 },
  { name: "Feb", revenue: 300000, expenses: 139800 },
  { name: "Mar", revenue: 200000, expenses: 98000 },
  { name: "Apr", revenue: 278000, expenses: 390800 },
  { name: "May", revenue: 189000, expenses: 48000 },
  { name: "Jun", revenue: 239000, expenses: 38000 },
  { name: "Jul", revenue: 349000, expenses: 43000 },
  { name: "Aug", revenue: 485000, expenses: 210000 },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here's what's happening with your business today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,85,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-emerald-500">
              <ArrowUpRight className="h-3 w-3" /> +18.4% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,20,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-rose-500">
              <ArrowUpRight className="h-3 w-3" /> +4.1% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-emerald-500">
              <ArrowUpRight className="h-3 w-3" /> +2 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-emerald-500">
              <ArrowUpRight className="h-3 w-3" /> +12% vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="expenses" stroke="#e11d48" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Rahul Sharma", company: "TechNova Solutions", status: "New", value: "₹25,000" },
                { name: "Priya Desai", company: "Desai Architects", status: "Contacted", value: "₹75,000" },
                { name: "Amit Patel", company: "Patel Manufacturing", status: "Proposal", value: "₹1,20,000" },
                { name: "Sneha Reddy", company: "Reddy Designs", status: "Negotiation", value: "₹45,000" },
              ].map((lead, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={lead.status === 'New' ? 'default' : 'secondary'}>{lead.status}</Badge>
                    <span className="font-medium text-sm">{lead.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
