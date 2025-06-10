
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Settings, UserCircle, Save, LockKeyhole, LogOut, Bell, Mail, Palette, Languages } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const { user, logout } = useAuth(); 
  const { toast } = useToast();
  const router = useRouter(); 

  // Profile States
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  // Notification Preferences States
  const [emailOnNewResponse, setEmailOnNewResponse] = useState(true);
  const [emailOnAIInsight, setEmailOnAIInsight] = useState(false);

  // Appearance State
  const [theme, setTheme] = useState("system"); // "light", "dark", "system"
  
  // Language State
  const [language, setLanguage] = useState("en"); // "en", "es", "fr"


  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save action
    console.log("Saving settings:", { displayName, email, emailOnNewResponse, emailOnAIInsight, theme, language });
    toast({ title: "Settings Saved", description: "Your profile and preferences have been updated." });
  };

  const handleLogout = async () => {
    await logout();
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push('/'); 
  };

  const handlePasswordReset = () => {
    toast({ title: "Password Reset Requested", description: "If your account exists, you will receive an email with instructions." });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline flex items-center"><Settings className="mr-3 h-8 w-8 text-primary"/>User Settings</h1>
      </div>
      <form onSubmit={handleSaveSettings}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Column 1: Profile Details */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="shadow-lg">
              <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-4 border-2 border-primary/50">
                  <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || "User"} />
                  <AvatarFallback className="text-3xl">{(user?.displayName || user?.email || "U")[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-headline">{user?.displayName || "User Profile"}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" type="button">
                  <UserCircle className="mr-2 h-4 w-4" /> Change Profile Picture
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Column 2: Account Info, Security, Preferences, Appearance */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-headline">Account Information</CardTitle>
                <CardDescription>Update your display name and preferred language.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                  <p className="text-xs text-muted-foreground">Email address cannot be changed here for this demo.</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="language" className="flex items-center"><Languages className="mr-2 h-4 w-4 text-muted-foreground"/> Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español (Spanish)</SelectItem>
                      <SelectItem value="fr">Français (French)</SelectItem>
                    </SelectContent>
                  </Select>
                   <p className="text-xs text-muted-foreground">Choose your preferred language for the application interface.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center"><Palette className="mr-2 h-5 w-5 text-primary"/> Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Select your preferred interface theme.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-headline">Security</CardTitle>
                <CardDescription>Manage your account security settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="change-password">Change Password</Label>
                  <Button variant="outline" className="w-full mt-1" type="button" onClick={handlePasswordReset}>
                    <LockKeyhole className="mr-2 h-4 w-4" /> Request Password Reset
                  </Button>
                </div>
                <div>
                  <Label htmlFor="logout">Log Out</Label>
                  <Button variant="destructive" className="w-full mt-1" type="button" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Log Out of Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-headline">Notification Preferences</CardTitle>
                <CardDescription>Choose what updates you want to receive.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="email-new-response" className="font-medium flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" /> Email for New Responses
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when a form you own gets a new response.
                    </p>
                  </div>
                  <Switch
                    id="email-new-response"
                    checked={emailOnNewResponse}
                    onCheckedChange={setEmailOnNewResponse}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="email-ai-insight" className="font-medium flex items-center">
                     <Bell className="mr-2 h-4 w-4 text-muted-foreground" /> Email for AI Insights
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new AI insights are ready for your forms.
                    </p>
                  </div>
                  <Switch
                    id="email-ai-insight"
                    checked={emailOnAIInsight}
                    onCheckedChange={setEmailOnAIInsight}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <CardFooter className="mt-8 flex justify-end border-t pt-6 bg-card rounded-b-lg shadow-lg">
            <Button type="submit" size="lg">
              <Save className="mr-2 h-5 w-5" /> Save Profile & Preferences
            </Button>
        </CardFooter>
      </form>
    </div>
  );
}
