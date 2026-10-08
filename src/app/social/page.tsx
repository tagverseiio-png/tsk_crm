"use client";

import { Plus, ExternalLink, Activity, Users, Image as ImageIcon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const platforms = [
  { name: "Instagram", account: "@tskcrm", followers: "12.5k", posts: 342, engagement: "4.8%", status: "Connected", color: "bg-pink-100 text-pink-800", iconColor: "text-pink-600" },
  { name: "Facebook", account: "TSK CRM Official", followers: "8.2k", posts: 215, engagement: "2.1%", status: "Connected", color: "bg-blue-100 text-blue-800", iconColor: "text-blue-600" },
  { name: "LinkedIn", account: "TSK CRM", followers: "5.1k", posts: 180, engagement: "5.4%", status: "Connected", color: "bg-indigo-100 text-indigo-800", iconColor: "text-indigo-600" },
  { name: "X", account: "@tsk_crm", followers: "3.4k", posts: 890, engagement: "1.8%", status: "Connected", color: "bg-gray-100 text-gray-800", iconColor: "text-gray-800" },
  { name: "YouTube", account: "TSK CRM", followers: "1.2k", posts: 45, engagement: "6.2%", status: "Needs Reconnect", color: "bg-red-100 text-red-800", iconColor: "text-red-600" },
  { name: "TikTok", account: "@tskcrm", followers: "450", posts: 12, engagement: "8.5%", status: "Disconnected", color: "bg-zinc-100 text-zinc-800", iconColor: "text-zinc-800" },
];

export default function SocialMediaPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Media</h1>
          <p className="text-muted-foreground">Manage your brand's presence across all platforms.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Connect Platform
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.name} className="flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {platform.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{platform.account}</p>
                </div>
                <Badge variant={platform.status === 'Connected' ? 'default' : platform.status === 'Needs Reconnect' ? 'destructive' : 'secondary'}>
                  {platform.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Followers</p>
                  <p className="font-semibold text-lg">{platform.followers}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Activity className="h-3 w-3" /> Engagement</p>
                  <p className="font-semibold text-lg text-emerald-600">{platform.engagement}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><ImageIcon className="h-3 w-3" /> Posts</p>
                  <p className="font-semibold text-lg">{platform.posts}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Heart className="h-3 w-3" /> Avg. Likes</p>
                  <p className="font-semibold text-lg">248</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-muted/50 bg-muted/10 flex justify-between">
              <Button variant="ghost" size="sm" className="text-muted-foreground">View Analytics</Button>
              <Button variant="outline" size="sm" disabled={platform.status !== 'Connected'}>
                <ExternalLink className="mr-2 h-3 w-3" /> Open
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
