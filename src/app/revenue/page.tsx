"use client";

import { Search, IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const mockRevenue = [
  { id: "REV-101", date: "Oct 08, 2026", source: "TechNova Solutions", category: "Web Dev", amount: 150000, status: "Cleared" },
  { id: "REV-102", date: "Oct 05, 2026", source: "Patel Manufacturing", category: "Marketing", amount: 210000, status: "Cleared" },
  { id: "REV-103", date: "Oct 02, 2026", source: "Desai Architects", category: "Video Production", amount: 50000, status: "Cleared" },
  { id: "REV-104", date: "Sep 28, 2026", source: "Singh Builders", category: "App Dev", amount: 350000, status: "Cleared" },
  { id: "REV-105", date: "Sep 25, 2026", source: "Reddy Designs", category: "SEO", amount: 45000, status: "Processing" },
];

const data = [
  { name: "Apr", revenue: 278000 },
  { name: "May", revenue: 189000 },
  { name: "Jun", revenue: 239000 },
  { name: "Jul", revenue: 349000 },
  { name: "Aug", revenue: 485000 },
  { name: "Sep", revenue: 410000 },
  { name: "Oct", revenue: 410000 }, // Partial
];

export default function RevenuePage() {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue</h1>
          <p className="text-muted-foreground">Track your income sources and growth.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹23,60,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-emerald-500">
              <ArrowUpRight className="h-3 w-3" /> +15% vs last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,10,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-emerald-500">
              <ArrowUpRight className="h-3 w-3" /> On track
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Deal Size</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,60,500</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-rose-500">
              <ArrowDownRight className="h-3 w-3" /> -2% vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-background flex-1 mt-2">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-lg">Recent Revenue Transactions</h3>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-8 h-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Source (Client)</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRevenue.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right font-medium text-emerald-600">{formatCurrency(item.amount)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={item.status === 'Cleared' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
