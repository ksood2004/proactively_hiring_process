"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function MyFormsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">My Forms</h1>
        <Button asChild>
          <Link href="/forms/create">Create New Form</Link>
        </Button>
      </div>
      <Card className="text-center py-12 shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Construction className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Under Construction</CardTitle>
          <CardDescription className="text-muted-foreground">
            This page will list all forms created by you. For now, please use the dashboard.
          </CardDescription>
        </CardHeader>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </Card>
      {/* Future implementation: List user's forms here, similar to dashboard but filtered */}
    </div>
  );
}
