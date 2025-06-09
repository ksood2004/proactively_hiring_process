"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks } from "lucide-react";

export default function AllResponsesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Form Responses</h1>
      </div>
       <Card className="text-center py-12 shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <ListChecks className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">View Form Responses</CardTitle>
          <CardDescription className="text-muted-foreground">
            Select a form from your dashboard to view its responses and gain AI insights.
          </CardDescription>
        </CardHeader>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </Card>
      {/* Future implementation: List forms and link to their individual response pages, or a summary view. */}
    </div>
  );
}
