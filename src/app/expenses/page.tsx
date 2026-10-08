"use client";

import { useState } from "react";
import { Plus, Search, IndianRupee, TrendingDown, ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const initialExpenses = [
  { id: "EXP-001", date: "Oct 05, 2026", vendor: "Adobe Systems", category: "Software", amount: 4500, status: "Paid" },
  { id: "EXP-002", date: "Oct 02, 2026", vendor: "Google Ads", category: "Advertising", amount: 25000, status: "Paid" },
  { id: "EXP-003", date: "Oct 01, 2026", vendor: "Employee Salaries", category: "Salary", amount: 150000, status: "Paid" },
  { id: "EXP-004", date: "Sep 28, 2026", vendor: "WeWork", category: "Office", amount: 35000, status: "Paid" },
  { id: "EXP-005", date: "Sep 25, 2026", vendor: "Upwork Escrow", category: "Freelancers", amount: 15000, status: "Pending" },
];

const categoryData = [
  { name: "Salary", value: 150000 },
  { name: "Advertising", value: 25000 },
  { name: "Office", value: 35000 },
  { name: "Software", value: 12000 },
  { name: "Travel", value: 8000 },
  { name: "Freelancers", value: 15000 },
];

const categories = ["Salary", "Advertising", "Software", "Office", "Travel", "Production", "Freelancers", "Other"];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">Manage and categorize your business spending.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          {/* @ts-expect-error asChild type issue */}
          <DialogTrigger render={<Button />}>
              <Plus className="mr-2 h-4 w-4" /> Add Expense
            </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Log New Expense</DialogTitle>
              <DialogDescription>
                Record a new business expense here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 grid-cols-2">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Vendor / Payee</label>
                <Input placeholder="E.g. Adobe Systems" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount (₹)</label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue="Paid">
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddOpen(false)}>Save Expense</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses (MTD)</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">₹2,45,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-emerald-500">
              <ArrowDownRight className="h-3 w-3" /> -5% vs last month (Good)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Largest Category</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Salary</div>
            <p className="text-xs text-muted-foreground mt-1 text-muted-foreground">
              61% of total expenses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹15,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 text-rose-500">
              <ArrowUpRight className="h-3 w-3" /> Needs action
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value))} />
                <Bar dataKey="value" fill="#e11d48" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-background flex-1 mt-2">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-lg">Expense Log</h3>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search expenses..." className="pl-8 h-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>{exp.date}</TableCell>
                <TableCell className="font-medium">{exp.vendor}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">{exp.category}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-rose-600">{formatCurrency(exp.amount)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={exp.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}>
                    {exp.status}
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
