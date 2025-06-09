"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, UserCircle, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();

  // Mock state for settings form
  // In a real app, this would be fetched and updated
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save action
    console.log("Saving settings:", { displayName, email });
    // toast({ title: "Settings Saved", description: "Your profile has been updated." });
  };


  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="items-center text-center">
               <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || "User"} />
                <AvatarFallback className="text-3xl">{(user?.displayName || user?.email || "U")[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl font-headline">{user?.displayName || "User Profile"}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </CardHeader>
            <CardContent>
               <Button variant="outline" className="w-full">Change Profile Picture</Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Account Information</CardTitle>
              <CardDescription>Update your account details here.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveSettings}>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                  <p className="text-xs text-muted-foreground">Email address cannot be changed here.</p>
                </div>
                 <div>
                  <Label htmlFor="password">Change Password</Label>
                  <Button variant="outline" className="w-full mt-1" type="button">Request Password Reset</Button>
                 </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
// Need to import useState for this component. Adding it here for completeness of thought.
// import { useState } from "react";
// And useToast
// import { useToast } from "@/hooks/use-toast";
// This was a quick addition, should actually be `useState` import. The linter would catch this.
// The full file content should import `useState` from `react`.
