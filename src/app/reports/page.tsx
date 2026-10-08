"use client";

import { Download, Filter, FileText, PieChart, BarChart as BarChartIcon, LineChart as LineChartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const reports = [
    { title: "Sales Overview", description: "Revenue, quotations, and invoice metrics.", icon: BarChartIcon, category: "Sales" },
    { title: "Lead Conversion", description: "Pipeline analysis and conversion rates.", icon: PieChart, category: "CRM" },
    { title: "Client Retention", description: "Churn rate and recurring revenue metrics.", icon: LineChartIcon, category: "CRM" },
    { title: "Project Profitability", description: "Budget vs actuals for all projects.", icon: BarChartIcon, category: "Projects" },
    { title: "Team Performance", description: "Task completion and hours logged.", icon: BarChartIcon, category: "Team" },
    { title: "Social Media Engagement", description: "Aggregate metrics across all platforms.", icon: LineChartIcon, category: "Marketing" },
    { title: "Content ROI", description: "Revenue attribution for marketing content.", icon: PieChart, category: "Marketing" },
    { title: "Expense Breakdown", description: "Detailed categorization of all spending.", icon: PieChart, category: "Finance" },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate and export analytics for your business.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <report.icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary">{report.category}</Badge>
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription className="line-clamp-2 min-h-[40px]">{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4 border-t border-muted/50">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground h-8 p-0 group-hover:text-primary">
                <FileText className="mr-2 h-4 w-4" /> View Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-dashed border-2 bg-muted/5">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <PlusIcon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Create Custom Report</h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            Can't find what you're looking for? Build a custom report using specific metrics and dimensions.
          </p>
          <Button>Build Report</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
