"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

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

const mockInvoices = [
  { id: "INV-2023-001", client: "TechNova Solutions", date: "Oct 01, 2026", dueDate: "Oct 15, 2026", amount: 250000, paid: 250000, balance: 0, status: "Paid" },
  { id: "INV-2023-002", client: "Patel Manufacturing", date: "Sep 20, 2026", dueDate: "Oct 05, 2026", amount: 420000, paid: 210000, balance: 210000, status: "Partially Paid" },
  { id: "INV-2023-003", client: "Desai Architects", date: "Oct 06, 2026", dueDate: "Oct 21, 2026", amount: 75000, paid: 0, balance: 75000, status: "Sent" },
  { id: "INV-2023-004", client: "Singh Builders", date: "Sep 10, 2026", dueDate: "Sep 25, 2026", amount: 150000, paid: 0, balance: 150000, status: "Overdue" },
  { id: "INV-2023-005", client: "Apex Industries", date: "Oct 08, 2026", dueDate: "Oct 22, 2026", amount: 320000, paid: 0, balance: 320000, status: "Draft" },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case "Paid": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Partially Paid": return "bg-blue-100 text-blue-800 border-blue-200";
    case "Sent": return "bg-purple-100 text-purple-800 border-purple-200";
    case "Draft": return "bg-gray-100 text-gray-800 border-gray-200";
    case "Overdue": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function InvoicesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [rate, setRate] = useState(100000);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  
  const subtotal = rate * quantity;
  const tax = (subtotal - discount) * 0.18;
  const grandTotal = subtotal - discount + tax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage billing and collect payments.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button />}>
              <Plus className="mr-2 h-4 w-4" /> Create Invoice
            </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
              <DialogDescription>
                Generate a new invoice. Calculations happen in real-time.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Client</label>
                  <Input placeholder="Select client..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project / Quotation Reference</label>
                  <Input placeholder="Optional..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Invoice Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <Input type="date" />
                </div>
              </div>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="font-medium mb-4 text-sm">Line Items</h4>
                <div className="grid grid-cols-12 gap-4 items-end mb-2">
                  <div className="col-span-6 space-y-1">
                    <label className="text-xs text-muted-foreground">Description</label>
                    <Input placeholder="E.g. Milestone 1 - Design" defaultValue="Milestone 1 - Design" />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs text-muted-foreground">Qty</label>
                    <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                  </div>
                  <div className="col-span-4 space-y-1">
                    <label className="text-xs text-muted-foreground">Rate (₹)</label>
                    <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2 text-xs h-8"><Plus className="mr-1 h-3 w-3" /> Add Item</Button>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes / Payment Details</label>
                    <Input placeholder="Bank account details..." />
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-md space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Discount (₹)</span>
                    <Input type="number" className="w-24 h-7 text-right" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (18% GST)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button variant="secondary" onClick={() => { setIsAddOpen(false); setIsPreviewOpen(true); }}>Preview</Button>
              <Button onClick={() => setIsAddOpen(false)}>Save Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Invoice Preview</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto bg-white p-8 border rounded-md text-black">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight bg-primary text-primary-foreground p-1 px-2 rounded-md inline-block mb-2">TSK CRM</h2>
                  <p className="text-sm text-gray-500">123 Business Park, Mumbai</p>
                  <p className="text-sm text-gray-500">finance@tskcrm.com | +91 98765 43210</p>
                  <p className="text-sm text-gray-500 mt-2 font-medium">GSTIN: 27ABCDE1234F1Z5</p>
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-light text-gray-400 mb-2">TAX INVOICE</h1>
                  <p className="font-medium text-gray-800 text-lg">INV-2026-104</p>
                  <div className="grid grid-cols-2 gap-x-4 mt-4 text-sm text-left border rounded-md p-3">
                    <span className="text-gray-500 font-medium">Invoice Date:</span>
                    <span className="text-right">Oct 08, 2026</span>
                    <span className="text-gray-500 font-medium">Due Date:</span>
                    <span className="text-right text-red-500 font-medium">Oct 22, 2026</span>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase border-b pb-1">Billed To:</h3>
                <p className="font-medium text-lg mt-3">TechNova Solutions</p>
                <p className="text-sm text-gray-600">456 Tech Park, Sector 4</p>
                <p className="text-sm text-gray-600">Bengaluru, Karnataka 560001</p>
                <p className="text-sm text-gray-600 mt-1">GSTIN: 29XYZDE1234F1Z5</p>
              </div>

              <table className="w-full mb-8 border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 text-sm font-semibold text-gray-700">Description</th>
                    <th className="p-3 text-sm font-semibold text-gray-700 text-center">Qty</th>
                    <th className="p-3 text-sm font-semibold text-gray-700 text-right">Rate</th>
                    <th className="p-3 text-sm font-semibold text-gray-700 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 text-sm font-medium text-gray-800">Milestone 1 - Design Phase</td>
                    <td className="p-3 text-sm text-center text-gray-600">{quantity}</td>
                    <td className="p-3 text-sm text-right text-gray-600">{formatCurrency(rate)}</td>
                    <td className="p-3 text-sm text-right font-medium text-gray-800">{formatCurrency(subtotal)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between mb-12">
                <div className="w-1/2 pr-8">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
                    <p><span className="font-medium">Bank:</span> HDFC Bank</p>
                    <p><span className="font-medium">Account Name:</span> TSK CRM PVT LTD</p>
                    <p><span className="font-medium">Account No:</span> 50200012345678</p>
                    <p><span className="font-medium">IFSC:</span> HDFC0001234</p>
                    <p className="mt-2 text-xs text-gray-500">Or pay via UPI: tskcrm@hdfcbank</p>
                  </div>
                </div>
                <div className="w-1/2 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-red-500">-{formatCurrency(discount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CGST (9%):</span>
                    <span className="font-medium">{formatCurrency(tax / 2)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b pb-3">
                    <span className="text-gray-600">SGST (9%):</span>
                    <span className="font-medium">{formatCurrency(tax / 2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Total Amount:</span>
                    <span className="text-primary">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Close Preview</Button>
              <Button>Send Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Invoiced", value: "₹12,15,000", icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Paid", value: "₹4,60,000", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
          { title: "Pending", value: "₹6,05,000", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
          { title: "Overdue", value: "₹1,50,000", icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
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
          <Input placeholder="Search invoices..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border bg-background flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium text-primary cursor-pointer hover:underline" onClick={() => setIsPreviewOpen(true)}>{inv.id}</TableCell>
                <TableCell>{inv.client}</TableCell>
                <TableCell>{inv.date}</TableCell>
                <TableCell className={inv.status === "Overdue" ? "text-red-600 font-medium" : ""}>{inv.dueDate}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(inv.amount)}</TableCell>
                <TableCell className="text-right font-medium text-muted-foreground">{formatCurrency(inv.balance)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(inv.status)}>
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setIsPreviewOpen(true)}>View / Print PDF</DropdownMenuItem>
                      <DropdownMenuItem className="text-emerald-600 font-medium">Record Payment</DropdownMenuItem>
                      <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Void Invoice</DropdownMenuItem>
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
