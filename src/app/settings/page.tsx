"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, Save, Key, Bell, Shield, Palette, Building, Image as ImageIcon, Users, Check, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

// --- 1. Interfaces ---

export interface GeneralSettings {
  companyName: string;
  workspaceName: string;
  workspaceUrl: string;
  legalName: string;
  tagline: string;
  defaultTimezone: string;
  defaultCurrency: string;
  country: string;
  state: string;
  numberFormat: string;
  firstDayOfWeek: string;
  financialYear: string;
}

export interface BrandingSettings {
  logoUrl: string;
  footerLogoUrl: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  taxSystem: string;
  taxId: string;
  taxRates: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  swift: string;
  upiId: string;
  qrCodeUrl: string;
  invoicePrefix: string;
  docNumberFormat: string;
  dueDays: string;
  dateFormat: string;
  defaultTerms: string;
  defaultNotes: string;
  pdfTemplateStyle: string;
  logoPosition: string;
  emailSignature: string;
  socialLinks: string;
}

export interface AppearanceSettings {
  theme: "system" | "light" | "dark";
  compactMode: boolean;
  sidebarCollapsed: boolean;
  sidebarStyle: string;
  uiPrimaryColor: string;
  uiSecondaryColor: string;
  uiAccentColor: string;
  fontSize: string;
  uiLanguage: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  slackIntegration: boolean;
  slackWebhookUrl: string;
  weeklyDigest: boolean;
  digestFrequency: string;
  mentionAlerts: boolean;
  invoiceAlerts: boolean;
  paymentAlerts: boolean;
  projectAlerts: boolean;
  supportAlerts: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  passwordStrength: string;
  loginNotifications: boolean;
  sessionTimeout: string;
  ipWhitelist: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedDate: string;
  status: "Active" | "Pending";
}

export interface TeamSettings {
  defaultRole: string;
  allowInvitations: boolean;
  members: TeamMember[];
}

export interface ApiKey {
  id: string;
  name: string;
  token: string;
  permissions: string;
  expiryDate: string;
  lastUsedAt: string;
}

export interface ApiSettings {
  keys: ApiKey[];
}

export interface WorkspaceSettings {
  general: GeneralSettings;
  branding: BrandingSettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  team: TeamSettings;
  api: ApiSettings;
}

// --- Mock Initial Data ---

const initialSettings: WorkspaceSettings = {
  general: {
    companyName: "TechNova Solutions",
    workspaceName: "TechNova HQ",
    workspaceUrl: "technova.tskcrm.com",
    legalName: "TechNova Solutions Pvt. Ltd.",
    tagline: "Innovating the future.",
    defaultTimezone: "Asia/Kolkata",
    defaultCurrency: "INR (₹)",
    country: "India",
    state: "Karnataka",
    numberFormat: "1,234.56",
    firstDayOfWeek: "Monday",
    financialYear: "Apr-Mar",
  },
  branding: {
    logoUrl: "/tsklogo.png",
    footerLogoUrl: "/tsklogo-gray.png",
    address: "123 Tech Park, Whitefield, Bangalore",
    phone: "+91 98765 43210",
    email: "billing@technova.com",
    website: "https://technova.com",
    primaryColor: "#0f172a",
    secondaryColor: "#3b82f6",
    accentColor: "#8b5cf6",
    taxSystem: "GST",
    taxId: "29ABCDE1234F1Z5",
    taxRates: "IGST: 18%, CGST: 9%, SGST: 9%",
    bankName: "HDFC Bank",
    accountNumber: "50100123456789",
    ifsc: "HDFC0001234",
    swift: "HDFCINIT",
    upiId: "technova@hdfc",
    qrCodeUrl: "",
    invoicePrefix: "INV",
    docNumberFormat: "{prefix}-{year}-{num}",
    dueDays: "15",
    dateFormat: "DD/MM/YYYY",
    defaultTerms: "Payment is due within 15 days.",
    defaultNotes: "Thank you for your business!",
    pdfTemplateStyle: "Modern",
    logoPosition: "Top Left",
    emailSignature: "TechNova Solutions Team\nbilling@technova.com",
    socialLinks: "twitter.com/technova, linkedin.com/company/technova",
  },
  appearance: {
    theme: "system",
    compactMode: false,
    sidebarCollapsed: false,
    sidebarStyle: "Modern",
    uiPrimaryColor: "Slate",
    uiSecondaryColor: "Blue",
    uiAccentColor: "Violet",
    fontSize: "Medium",
    uiLanguage: "English (US)",
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    slackIntegration: false,
    slackWebhookUrl: "",
    weeklyDigest: true,
    digestFrequency: "Weekly",
    mentionAlerts: true,
    invoiceAlerts: true,
    paymentAlerts: true,
    projectAlerts: false,
    supportAlerts: true,
  },
  security: {
    twoFactorAuth: false,
    passwordStrength: "Strong",
    loginNotifications: true,
    sessionTimeout: "12 Hours",
    ipWhitelist: "",
  },
  team: {
    defaultRole: "Member",
    allowInvitations: true,
    members: [
      { id: "1", name: "Joseline Esther", email: "joseline@technova.com", role: "Admin", joinedDate: "Oct 1, 2026", status: "Active" },
      { id: "2", name: "John Doe", email: "john@technova.com", role: "Manager", joinedDate: "Oct 5, 2026", status: "Active" },
      { id: "3", name: "Jane Smith", email: "jane@technova.com", role: "Member", joinedDate: "Oct 7, 2026", status: "Pending" },
    ]
  },
  api: {
    keys: [
      { id: "k1", name: "Zapier Integration", token: "tsk_live_8f92j...", permissions: "Read/Write", expiryDate: "Never", lastUsedAt: "2 mins ago" },
      { id: "k2", name: "Custom Dashboard", token: "tsk_live_3v19n...", permissions: "Read Only", expiryDate: "Dec 31, 2026", lastUsedAt: "1 day ago" },
    ]
  }
};

// --- Page Component ---

export default function SettingsPage() {
  const [settings, setSettings] = useState<WorkspaceSettings>(initialSettings);
  
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workspace_settings.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.info("Settings exported.");
  };

  const handleImport = () => {
    toast.info("Import functionality would trigger a file picker here.");
  };

  return (
    <div className="flex flex-col gap-6 h-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workspace Settings</h1>
          <p className="text-muted-foreground">Manage your CRM preferences, branding, and configurations.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleImport}><Upload className="h-4 w-4 mr-2" /> Import</Button>
          <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2" /> Export</Button>
          <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full flex flex-col md:flex-row gap-6">
        <TabsList className="flex flex-col h-auto bg-transparent justify-start space-y-1 w-full md:w-64 shrink-0">
          <TabsTrigger value="general" className="w-full justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5">
            <Building className="h-4 w-4 mr-3" /> General
          </TabsTrigger>
          <TabsTrigger value="branding" className="w-full justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5">
            <ImageIcon className="h-4 w-4 mr-3" /> Branding & Docs
          </TabsTrigger>
          <TabsTrigger value="appearance" className="w-full justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5">
            <Palette className="h-4 w-4 mr-3" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5">
            <Bell className="h-4 w-4 mr-3" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5">
            <Shield className="h-4 w-4 mr-3" /> Security
          </TabsTrigger>
          <TabsTrigger value="team" className="w-full justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5">
            <Users className="h-4 w-4 mr-3" /> Team
          </TabsTrigger>
          <TabsTrigger value="api" className="w-full justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2.5">
            <Key className="h-4 w-4 mr-3" /> API Keys
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 w-full max-w-4xl">
          {/* GENERAL TAB */}
          <TabsContent value="general" className="mt-0 space-y-6 animate-in fade-in-50 duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Workspace Details</CardTitle>
                <CardDescription>Core details about your company and workspace.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Company Name</Label><Input defaultValue={settings.general.companyName} /></div>
                  <div className="space-y-2"><Label>Legal Name</Label><Input defaultValue={settings.general.legalName} /></div>
                  <div className="space-y-2"><Label>Workspace Name</Label><Input defaultValue={settings.general.workspaceName} /></div>
                  <div className="space-y-2"><Label>Workspace URL</Label><Input defaultValue={settings.general.workspaceUrl} /></div>
                  <div className="space-y-2 md:col-span-2"><Label>Tagline</Label><Input defaultValue={settings.general.tagline} /></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localization & Formats</CardTitle>
                <CardDescription>Regional settings for currency, time, and numbers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select defaultValue={settings.general.defaultCurrency}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="INR (₹)">INR (₹)</SelectItem><SelectItem value="USD ($)">USD ($)</SelectItem><SelectItem value="EUR (€)">EUR (€)</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue={settings.general.defaultTimezone}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem><SelectItem value="UTC">UTC</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2"><Label>Country</Label><Input defaultValue={settings.general.country} /></div>
                  <div className="space-y-2"><Label>State/Province</Label><Input defaultValue={settings.general.state} /></div>
                  <div className="space-y-2">
                    <Label>Number Format</Label>
                    <Select defaultValue={settings.general.numberFormat}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="1,234.56">1,234.56</SelectItem><SelectItem value="1.234,56">1.234,56</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Financial Year</Label>
                    <Select defaultValue={settings.general.financialYear}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Apr-Mar">April - March</SelectItem><SelectItem value="Jan-Dec">January - December</SelectItem></SelectContent></Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BRANDING TAB */}
          <TabsContent value="branding" className="mt-0 space-y-6 animate-in fade-in-50 duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Brand Assets & Contact</CardTitle>
                <CardDescription>Public-facing company info used on documents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Primary Logo URL</Label><Input defaultValue={settings.branding.logoUrl} /></div>
                  <div className="space-y-2"><Label>Footer Logo URL</Label><Input defaultValue={settings.branding.footerLogoUrl} /></div>
                  <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue={settings.branding.email} /></div>
                  <div className="space-y-2"><Label>Phone</Label><Input defaultValue={settings.branding.phone} /></div>
                  <div className="space-y-2 md:col-span-2"><Label>Business Address</Label><Textarea defaultValue={settings.branding.address} rows={2} /></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial & Tax Information</CardTitle>
                <CardDescription>Banking details and tax config for invoices.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Tax System</Label><Input defaultValue={settings.branding.taxSystem} /></div>
                  <div className="space-y-2"><Label>Tax ID (GSTIN)</Label><Input defaultValue={settings.branding.taxId} /></div>
                  <div className="space-y-2 md:col-span-2"><Label>Default Tax Rates</Label><Input defaultValue={settings.branding.taxRates} /></div>
                  <Separator className="col-span-2 my-2" />
                  <div className="space-y-2"><Label>Bank Name</Label><Input defaultValue={settings.branding.bankName} /></div>
                  <div className="space-y-2"><Label>Account Number</Label><Input defaultValue={settings.branding.accountNumber} /></div>
                  <div className="space-y-2"><Label>IFSC Code</Label><Input defaultValue={settings.branding.ifsc} /></div>
                  <div className="space-y-2"><Label>UPI ID</Label><Input defaultValue={settings.branding.upiId} /></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Configuration</CardTitle>
                <CardDescription>Formats and templates for invoices and quotes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Invoice Prefix</Label><Input defaultValue={settings.branding.invoicePrefix} /></div>
                  <div className="space-y-2"><Label>Numbering Format</Label><Input defaultValue={settings.branding.docNumberFormat} /></div>
                  <div className="space-y-2"><Label>Default Due Days</Label><Input type="number" defaultValue={settings.branding.dueDays} /></div>
                  <div className="space-y-2">
                    <Label>PDF Template Style</Label>
                    <Select defaultValue={settings.branding.pdfTemplateStyle}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Modern">Modern</SelectItem><SelectItem value="Classic">Classic</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2 md:col-span-2"><Label>Default Terms & Conditions</Label><Textarea defaultValue={settings.branding.defaultTerms} /></div>
                  <div className="space-y-2 md:col-span-2"><Label>Default Footer Notes</Label><Textarea defaultValue={settings.branding.defaultNotes} /></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* APPEARANCE TAB */}
          <TabsContent value="appearance" className="mt-0 space-y-6 animate-in fade-in-50 duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Theme & Layout</CardTitle>
                <CardDescription>Personalize how the CRM looks and feels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Dark Mode</h4>
                    <p className="text-sm text-muted-foreground">Toggle dark mode on or off.</p>
                  </div>
                  <Switch defaultChecked={settings.appearance.theme === 'dark'} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Compact Mode</h4>
                    <p className="text-sm text-muted-foreground">Reduce padding for denser data tables.</p>
                  </div>
                  <Switch defaultChecked={settings.appearance.compactMode} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Collapsed Sidebar</h4>
                    <p className="text-sm text-muted-foreground">Start with the sidebar collapsed.</p>
                  </div>
                  <Switch defaultChecked={settings.appearance.sidebarCollapsed} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label>UI Language</Label>
                    <Select defaultValue={settings.appearance.uiLanguage}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="English (US)">English (US)</SelectItem><SelectItem value="Hindi">Hindi</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select defaultValue={settings.appearance.fontSize}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Small">Small</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="Large">Large</SelectItem></SelectContent></Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications" className="mt-0 space-y-6 animate-in fade-in-50 duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Where you receive alerts from the CRM.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive daily summaries and critical alerts via email.</p>
                  </div>
                  <Switch defaultChecked={settings.notifications.emailNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Browser push notifications for real-time updates.</p>
                  </div>
                  <Switch defaultChecked={settings.notifications.pushNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Slack Integration</h4>
                    <p className="text-sm text-muted-foreground">Post activity updates to a Slack channel.</p>
                  </div>
                  <Switch defaultChecked={settings.notifications.slackIntegration} />
                </div>
                {settings.notifications.slackIntegration && (
                  <div className="pt-2 space-y-2">
                    <Label>Slack Webhook URL</Label>
                    <Input placeholder="https://hooks.slack.com/services/..." />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
                <CardDescription>Configure which events trigger a notification.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                  <Label>New Invoice Generated</Label>
                  <Switch defaultChecked={settings.notifications.invoiceAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Payment Received</Label>
                  <Switch defaultChecked={settings.notifications.paymentAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Project Deadline Approaching</Label>
                  <Switch defaultChecked={settings.notifications.projectAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Support Ticket Mentions</Label>
                  <Switch defaultChecked={settings.notifications.mentionAlerts} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECURITY TAB */}
          <TabsContent value="security" className="mt-0 space-y-6 animate-in fade-in-50 duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Authentication & Security</CardTitle>
                <CardDescription>Manage how users securely access the workspace.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Two-Factor Authentication (2FA)</h4>
                    <p className="text-sm text-muted-foreground">Require a secondary code for all user logins.</p>
                  </div>
                  <Switch defaultChecked={settings.security.twoFactorAuth} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">New Device Login Alerts</h4>
                    <p className="text-sm text-muted-foreground">Send an email when a new device accesses an account.</p>
                  </div>
                  <Switch defaultChecked={settings.security.loginNotifications} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label>Session Timeout</Label>
                    <Select defaultValue={settings.security.sessionTimeout}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="1 Hour">1 Hour</SelectItem><SelectItem value="12 Hours">12 Hours</SelectItem><SelectItem value="7 Days">7 Days</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Password Strength Rule</Label>
                    <Select defaultValue={settings.security.passwordStrength}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Standard">Standard (8 chars)</SelectItem><SelectItem value="Strong">Strong (12 chars + Symbols)</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>IP Whitelist (Optional)</Label>
                    <Textarea placeholder="Enter comma-separated IP addresses to restrict access..." defaultValue={settings.security.ipWhitelist} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TEAM TAB */}
          <TabsContent value="team" className="mt-0 space-y-6 animate-in fade-in-50 duration-300">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Team Directory</CardTitle>
                  <CardDescription>Manage users and their access levels.</CardDescription>
                </div>
                <Button size="sm"><Users className="mr-2 h-4 w-4" /> Invite Member</Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6 bg-muted/50 p-4 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">Allow Team Invitations</h4>
                    <p className="text-xs text-muted-foreground">Can members invite others?</p>
                  </div>
                  <Switch defaultChecked={settings.team.allowInvitations} />
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {settings.team.members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.email}</div>
                          </TableCell>
                          <TableCell><Badge variant="outline">{member.role}</Badge></TableCell>
                          <TableCell className="text-sm">{member.joinedDate}</TableCell>
                          <TableCell>
                            <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>{member.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API TAB */}
          <TabsContent value="api" className="mt-0 space-y-6 animate-in fade-in-50 duration-300">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage tokens for programmatic access to the CRM.</CardDescription>
                </div>
                <Button size="sm"><Key className="mr-2 h-4 w-4" /> Generate New Key</Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Key Name</TableHead>
                        <TableHead>Token</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {settings.api.keys.map((key) => (
                        <TableRow key={key.id}>
                          <TableCell className="font-medium">{key.name}</TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">{key.token}</TableCell>
                          <TableCell><Badge variant="outline">{key.permissions}</Badge></TableCell>
                          <TableCell className="text-sm text-muted-foreground">{key.lastUsedAt}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon-sm" title="Copy"><Copy className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon-sm" className="text-destructive" title="Revoke"><Trash2 className="h-4 w-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
