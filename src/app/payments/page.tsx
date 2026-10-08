"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, IndianRupee, ArrowUpRight, Clock, AlertCircle } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
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

const initialPayments = [
  { id: "PAY-2026-101", client: "TechNova Solutions", invoice: "INV-2023-001", amount: 250000, date: "Oct 05, 2026", method: "Bank Transfer", status: "Completed" },
  { id: "PAY-2026-102", client: "Patel Manufacturing", invoice: "INV-2023-002", amount: 210000, date: "Oct 01, 2026", method: "UPI", status: "Completed" },
  { id: "PAY-2026-103", client: "Singh Builders", invoice: "INV-2023-004", amount: 50000, date: "Sep 28, 2026", method: "Card", status: "Processing" },
  { id: "PAY-2026-104", client: "Desai Architects", invoice: "INV-2023-003", amount: 25000, date: "Oct 08, 2026", method: "Cash", status: "Completed" },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case "Completed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Processing": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Failed": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [client, setClient] = useState("");
  const [invoice, setInvoice] = useState("");
  const [method, setMethod] = useState("UPI");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const handleRecordPayment = () => {
    if (!amount || !client) return;

    const newPayment = {
      id: `PAY-2026-${105 + payments.length}`,
      client: client,
      invoice: invoice || "Advance",
      amount: Number(amount),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      method: method,
      status: "Completed"
    };

    setPayments([newPayment, ...payments]);
    setIsAddOpen(false);
    setAmount("");
    setClient("");
    setInvoice("");
    setMethod("UPI");
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Track and record incoming payments.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button />}>
              <Plus className="mr-2 h-4 w-4" /> Record Payment
            </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
              <DialogDescription>
                Log a new payment received from a client.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 grid-cols-2">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Client</label>
                <Input placeholder="Enter client name..." value={client} onChange={(e) => setClient(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount Received (₹)</label>
                <Input type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Invoice Number</label>
                <Input placeholder="Optional..." value={invoice} onChange={(e) => setInvoice(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <Select value={method} onValueChange={(val) => val && setMethod(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Received</label>
                <Input type="date" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Reference / Transaction ID</label>
                <Input placeholder="E.g. UTR Number" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleRecordPayment}>Save Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Collected", value: "₹45,50,000", icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-100" },
          { title: "This Month", value: "₹4,85,000", icon: ArrowUpRight, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Pending", value: "₹6,05,000", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
          { title: "Outstanding", value: "₹1,50,000", icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
              <div className={`h-10 w-10 rounded-full ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4 bg-background p-4 rounded-lg border mt-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search payments..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border bg-background flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((pay) => (
              <TableRow key={pay.id}>
                <TableCell className="font-medium text-primary">{pay.id}</TableCell>
                <TableCell>{pay.client}</TableCell>
                <TableCell className="text-muted-foreground">{pay.invoice}</TableCell>
                <TableCell className="text-right font-medium text-emerald-600">{formatCurrency(pay.amount)}</TableCell>
                <TableCell>{pay.date}</TableCell>
                <TableCell>{pay.method}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(pay.status)}>
                    {pay.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Receipt</DropdownMenuItem>
                      <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Refund</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
