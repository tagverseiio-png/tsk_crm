"use client";

import { IndianRupee, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Apr", revenue: 278000, expenses: 140000, profit: 138000 },
  { name: "May", revenue: 189000, expenses: 130000, profit: 59000 },
  { name: "Jun", revenue: 239000, expenses: 145000, profit: 94000 },
  { name: "Jul", revenue: 349000, expenses: 180000, profit: 169000 },
  { name: "Aug", revenue: 485000, expenses: 220000, profit: 265000 },
  { name: "Sep", revenue: 410000, expenses: 210000, profit: 200000 },
];

export default function ProfitLossPage() {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profit & Loss</h1>
          <p className="text-muted-foreground">Financial summary and profitability tracking.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-emerald-50/50 border-emerald-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Total Profit (YTD)</CardTitle>
            <IndianRupee className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">₹9,25,000</div>
            <p className="text-xs text-emerald-600/80 mt-1">
              39% Net Profit Margin
            </p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50/50 border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Revenue (YTD)</CardTitle>
            <IndianRupee className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">₹23,60,000</div>
            <p className="text-xs text-blue-600/80 mt-1">
              Gross Income
            </p>
          </CardContent>
        </Card>
        <Card className="bg-rose-50/50 border-rose-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-rose-800">Total Expenses (YTD)</CardTitle>
            <IndianRupee className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700">₹14,35,000</div>
            <p className="text-xs text-rose-600/80 mt-1">
              Operating Costs
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#e11d48" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-background flex-1 mt-2 p-6">
        <h3 className="font-semibold text-lg mb-6">P&L Statement (Last 6 Months)</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-muted-foreground border-b pb-2 mb-3 uppercase text-xs">Income</h4>
            <div className="flex justify-between items-center py-2 text-sm">
              <span>Sales Revenue</span>
              <span className="font-medium">₹23,60,000</span>
            </div>
            <div className="flex justify-between items-center py-2 text-sm">
              <span>Other Income</span>
              <span className="font-medium">₹0</span>
            </div>
            <div className="flex justify-between items-center py-2 font-semibold bg-muted/20 px-3 rounded text-sm mt-2">
              <span>Total Income</span>
              <span>₹23,60,000</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-muted-foreground border-b pb-2 mb-3 uppercase text-xs">Cost of Goods Sold</h4>
            <div className="flex justify-between items-center py-2 text-sm">
              <span>Freelancers / Contractors</span>
              <span className="font-medium">₹1,20,000</span>
            </div>
            <div className="flex justify-between items-center py-2 text-sm">
              <span>Production Costs</span>
              <span className="font-medium">₹45,000</span>
            </div>
            <div className="flex justify-between items-center py-2 font-semibold bg-muted/20 px-3 rounded text-sm mt-2">
              <span>Total COGS</span>
              <span>₹1,65,000</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 font-bold text-base border-t border-b">
            <span>Gross Profit</span>
            <span>₹21,95,000</span>
          </div>

          <div>
            <h4 className="font-medium text-muted-foreground border-b pb-2 mb-3 uppercase text-xs">Operating Expenses</h4>
            <div className="flex justify-between items-center py-2 text-sm text-muted-foreground">
              <span>Salaries</span>
              <span>₹8,50,000</span>
            </div>
            <div className="flex justify-between items-center py-2 text-sm text-muted-foreground">
              <span>Advertising</span>
              <span>₹1,80,000</span>
            </div>
            <div className="flex justify-between items-center py-2 text-sm text-muted-foreground">
              <span>Office / Rent</span>
              <span>₹1,60,000</span>
            </div>
            <div className="flex justify-between items-center py-2 text-sm text-muted-foreground">
              <span>Software</span>
              <span>₹80,000</span>
            </div>
            <div className="flex justify-between items-center py-2 font-semibold bg-muted/20 px-3 rounded text-sm mt-2">
              <span>Total Operating Expenses</span>
              <span>₹12,70,000</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 font-bold text-xl border-t bg-emerald-50 text-emerald-800 px-4 rounded-lg">
            <span>Net Profit</span>
            <span>₹9,25,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
