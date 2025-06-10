
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Form } from "@/types";
import { FilePlus2, Edit3, Eye, BarChartBig, Users, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

// Mock forms data
const mockForms: Form[] = [
  {
    id: "form-1",
    title: "Customer Feedback Survey",
    description: "Gather feedback from our valued customers.",
    fields: [],
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    responseCount: 75,
  },
  {
    id: "form-2",
    title: "Employee Satisfaction Poll",
    description: "Understand employee morale and identify areas for improvement.",
    fields: [],
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    responseCount: 120,
  },
  {
    id: "form-3",
    title: "Event Registration Form",
    description: "Register attendees for the upcoming annual conference.",
    fields: [],
    createdBy: "user-2",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    responseCount: 30,
  },
];

export default function DashboardPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching forms
    setTimeout(() => {
      setForms(mockForms);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">Manage your forms and view responses.</p>
        </div>
        <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
          <Link href="/forms/create">
            <FilePlus2 className="mr-2 h-5 w-5" /> Create New Form
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-1"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="h-8 bg-muted rounded w-20"></div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : forms.length === 0 ? (
        <div className="text-center py-12">
           <Image src="https://placehold.co/300x200.png" alt="No forms" data-ai-hint="empty state illustration" width={300} height={200} className="mx-auto mb-4 rounded-lg" />
          <h2 className="text-2xl font-semibold mb-2">No Forms Yet</h2>
          <p className="text-muted-foreground mb-4">Get started by creating your first form.</p>
          <Button asChild>
            <Link href="/forms/create">
              <FilePlus2 className="mr-2 h-4 w-4" /> Create Form
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <Card key={form.id} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline text-xl hover:text-primary transition-colors">
                  <Link href={`/forms/${form.id}/edit`}>{form.title}</Link>
                </CardTitle>
                <CardDescription className="h-10 overflow-hidden text-ellipsis">
                  {form.description || "No description available."}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Created: {new Date(form.createdAt).toLocaleDateString()}</p>
                <p>Last Updated: {new Date(form.updatedAt).toLocaleDateString()}</p>
                <p>Responses: {form.responseCount ?? 0}</p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 border-t">
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" asChild title="Edit Form">
                    <Link href={`/forms/${form.id}/edit`}><Edit3 className="h-4 w-4" /></Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild title="Fill Form">
                    <Link href={`/forms/${form.id}/fill`}><Eye className="h-4 w-4" /></Link>
                  </Button>
                   <Button variant="outline" size="sm" asChild title="View Responses">
                    <Link href={`/forms/${form.id}/responses`}><BarChartBig className="h-4 w-4" /></Link>
                  </Button>
                </div>
                 <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" title="Delete Form">
                    <Trash2 className="h-4 w-4" />
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

