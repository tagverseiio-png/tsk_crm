"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, FileText, CheckCircle, XCircle, Eye, FileOutput } from "lucide-react";

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

const mockQuotations = [
  { id: "QT-2023-001", client: "TechNova Solutions", date: "Oct 01, 2026", validUntil: "Oct 15, 2026", amount: 250000, status: "Accepted" },
  { id: "QT-2023-002", client: "Patel Manufacturing", date: "Oct 05, 2026", validUntil: "Oct 20, 2026", amount: 420000, status: "Sent" },
  { id: "QT-2023-003", client: "Desai Architects", date: "Oct 06, 2026", validUntil: "Oct 21, 2026", amount: 75000, status: "Viewed" },
  { id: "QT-2023-004", client: "Reddy Designs", date: "Oct 07, 2026", validUntil: "Oct 22, 2026", amount: 45000, status: "Draft" },
  { id: "QT-2023-005", client: "Singh Builders", date: "Sep 20, 2026", validUntil: "Oct 05, 2026", amount: 150000, status: "Expired" },
  { id: "QT-2023-006", client: "Apex Industries", date: "Sep 25, 2026", validUntil: "Oct 10, 2026", amount: 320000, status: "Rejected" },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case "Accepted": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Sent": return "bg-blue-100 text-blue-800 border-blue-200";
    case "Viewed": return "bg-purple-100 text-purple-800 border-purple-200";
    case "Draft": return "bg-gray-100 text-gray-800 border-gray-200";
    case "Rejected": return "bg-red-100 text-red-800 border-red-200";
    case "Expired": return "bg-orange-100 text-orange-800 border-orange-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function QuotationsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [rate, setRate] = useState(100000);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(5000);
  
  const subtotal = rate * quantity;
  const tax = (subtotal - discount) * 0.18; // 18% GST
  const grandTotal = subtotal - discount + tax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
          <p className="text-muted-foreground">Manage your sales proposals and quotes.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button />}>
              <Plus className="mr-2 h-4 w-4" /> Create Quotation
            </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create Quotation</DialogTitle>
              <DialogDescription>
                Build a new quotation with live calculations.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Client</label>
                  <Input placeholder="Select client..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quotation Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Valid Until</label>
                  <Input type="date" />
                </div>
              </div>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="font-medium mb-4 text-sm">Services Details</h4>
                <div className="grid grid-cols-12 gap-4 items-end mb-2">
                  <div className="col-span-6 space-y-1">
                    <label className="text-xs text-muted-foreground">Service Description</label>
                    <Input placeholder="E.g. Website Development" defaultValue="Website Development" />
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
                    <label className="text-sm font-medium">Notes</label>
                    <Input placeholder="Visible to client..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Terms & Conditions</label>
                    <Input placeholder="Standard terms apply..." />
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
                    <span>Grand Total</span>
                    <span className="text-primary">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button variant="secondary" onClick={() => { setIsAddOpen(false); setIsPreviewOpen(true); }}>Preview</Button>
              <Button onClick={() => setIsAddOpen(false)}>Save as Draft</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Quotation Preview</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto bg-white p-8 border rounded-md text-black">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight bg-primary text-primary-foreground p-1 px-2 rounded-md inline-block mb-2">TSK CRM</h2>
                  <p className="text-sm text-gray-500">123 Business Park, Mumbai</p>
                  <p className="text-sm text-gray-500">contact@tskcrm.com | +91 98765 43210</p>
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-light text-gray-400 mb-2">QUOTATION</h1>
                  <p className="font-medium text-gray-800">QT-2026-007</p>
                  <p className="text-sm text-gray-500 mt-2">Date: Oct 08, 2026</p>
                  <p className="text-sm text-gray-500">Valid Until: Oct 22, 2026</p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">Quoted To:</h3>
                <p className="font-medium text-lg">TechNova Solutions</p>
                <p className="text-sm text-gray-600">Attn: Rahul Sharma</p>
                <p className="text-sm text-gray-600">rahul@technova.example.com</p>
              </div>

              <table className="w-full mb-12">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-left">
                    <th className="py-3 text-sm font-semibold text-gray-600">Description</th>
                    <th className="py-3 text-sm font-semibold text-gray-600 text-center">Qty</th>
                    <th className="py-3 text-sm font-semibold text-gray-600 text-right">Rate</th>
                    <th className="py-3 text-sm font-semibold text-gray-600 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 text-sm font-medium">Website Development</td>
                    <td className="py-4 text-sm text-center">{quantity}</td>
                    <td className="py-4 text-sm text-right">{formatCurrency(rate)}</td>
                    <td className="py-4 text-sm text-right font-medium">{formatCurrency(subtotal)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end mb-12">
                <div className="w-1/2 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-red-500">-{formatCurrency(discount)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b pb-3">
                    <span className="text-gray-600">Tax (18% GST):</span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Total:</span>
                    <span className="text-primary">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">Terms & Conditions</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  1. Payment terms: 50% advance, 50% on completion.<br/>
                  2. Validity: This quotation is valid for 14 days from the date of issue.<br/>
                  3. Any additional work outside the scope of this quotation will be charged separately.
                </p>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Close Preview</Button>
              <Button><FileOutput className="mr-2 h-4 w-4" /> Download PDF</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { title: "Total", value: "24", icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Accepted", value: "8", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
          { title: "Sent", value: "6", icon: FileOutput, color: "text-indigo-600", bg: "bg-indigo-100" },
          { title: "Viewed", value: "4", icon: Eye, color: "text-purple-600", bg: "bg-purple-100" },
          { title: "Draft", value: "3", icon: FileText, color: "text-gray-600", bg: "bg-gray-100" },
          { title: "Rejected", value: "3", icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
              <div className={`h-8 w-8 rounded-full ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4 bg-background p-4 rounded-lg border mt-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search quotations..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border bg-background flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quotation #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockQuotations.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium text-primary cursor-pointer hover:underline" onClick={() => setIsPreviewOpen(true)}>{quote.id}</TableCell>
                <TableCell>{quote.client}</TableCell>
                <TableCell>{quote.date}</TableCell>
                <TableCell>{quote.validUntil}</TableCell>
                <TableCell className="font-medium">{formatCurrency(quote.amount)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(quote.status)}>
                    {quote.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setIsPreviewOpen(true)}>Preview PDF</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Sent</DropdownMenuItem>
                      <DropdownMenuItem className="text-emerald-600 font-medium">Mark as Accepted</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 font-medium">Mark as Rejected</DropdownMenuItem>
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
    </div>
  );
}
