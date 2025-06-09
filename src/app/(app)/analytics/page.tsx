"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Analytics</h1>
      </div>
      <Card className="text-center py-12 shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <BarChart3 className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Analytics Dashboard</CardTitle>
          <CardDescription className="text-muted-foreground">
            This section is under development. Soon you'll be able to see detailed analytics for your forms here.
          </CardDescription>
        </CardHeader>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </Card>
    </div>
  );
}
