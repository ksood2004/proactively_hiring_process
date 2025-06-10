
"use client";

import Link from "next/link";
import { useState } from "react"; // Added useState import
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, ShieldCheck, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Added useToast import

export default function AdminSettingsPage() {
  const { toast } = useToast(); // Initialized useToast

  // Mock states for admin settings
  // In a real app, these would be fetched and persisted
  const [allowPublicSignup, setAllowPublicSignup] = useState(true);
  const [defaultUserRole, setDefaultUserRole] = useState("Filler");
  const [maxFormsPerUser, setMaxFormsPerUser] = useState(10);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving admin settings:", { allowPublicSignup, defaultUserRole, maxFormsPerUser });
    // toast({ title: "Admin Settings Saved", description: "System settings have been updated." });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline flex items-center"><ShieldCheck className="mr-3 h-8 w-8 text-primary"/> Admin - System Settings</h1>
      </div>
      <form onSubmit={handleSaveChanges}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-headline">User & Access Control</CardTitle>
              <CardDescription>Configure user registration and default permissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="allow-signup" className="font-medium">Allow Public Signups</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable new user registrations.
                  </p>
                </div>
                <Switch
                  id="allow-signup"
                  checked={allowPublicSignup}
                  onCheckedChange={setAllowPublicSignup}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-role">Default User Role</Label>
                {/* This should be a Select component in a real app */}
                <Input id="default-role" value={defaultUserRole} onChange={(e) => setDefaultUserRole(e.target.value)} placeholder="E.g., Viewer, Filler"/>
                <p className="text-xs text-muted-foreground">
                  The role assigned to new users upon registration.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Resource Limits</CardTitle>
              <CardDescription>Set limits for resources like forms per user.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="max-forms">Maximum Forms Per User</Label>
                <Input 
                  id="max-forms" 
                  type="number" 
                  value={maxFormsPerUser} 
                  onChange={(e) => setMaxFormsPerUser(parseInt(e.target.value,10))}
                  min="1"
                />
                <p className="text-xs text-muted-foreground">
                  Set to 0 for unlimited forms.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <CardFooter className="mt-8 flex justify-end border-t pt-6">
          <Button type="submit" size="lg">
            <Save className="mr-2 h-5 w-5" /> Save All Settings
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}
