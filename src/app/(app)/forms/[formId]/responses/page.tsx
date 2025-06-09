"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { FormResponsesViewer } from "@/components/forms/FormResponsesViewer";
import { AIInsights } from "@/components/forms/AIInsights";
import type { Form, FormResponse, AIFormSchema, AIFormResponse } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data - in a real app, fetch this based on formId
const mockFormsStore: Record<string, Form> = {
  "form-1": {
    id: "form-1",
    title: "Customer Feedback Survey",
    description: "Feedback from our valued customers.",
    fields: [
      { id: "field-name", label: "Full Name", type: "text", required: true },
      { id: "field-email", label: "Email Address", type: "text", required: true },
      { id: "field-rating", label: "Overall Satisfaction (1-5)", type: "number", required: true },
      { id: "field-service", label: "Service Used", type: "dropdown", required: true, options: [{id: "s1", value: "S1", label:"S1"}] },
      { id: "field-comments", label: "Additional Comments", type: "text", required: false },
    ],
    createdBy: "user-1", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
};

const mockResponsesStore: Record<string, FormResponse[]> = {
  "form-1": [
    { id: "resp-1", formId: "form-1", userId: "user-A", submittedAt: new Date(Date.now() - 1*60*60*1000).toISOString(), data: { "field-name": "Alice Smith", "field-email": "alice@example.com", "field-rating": 5, "field-service": "Service A", "field-comments": "Great service!" } },
    { id: "resp-2", formId: "form-1", userId: "user-B", submittedAt: new Date(Date.now() - 2*60*60*1000).toISOString(), data: { "field-name": "Bob Johnson", "field-email": "bob@example.com", "field-rating": 4, "field-service": "Service B", "field-comments": "Good, but could be faster." } },
    { id: "resp-3", formId: "form-1", userId: "user-C", submittedAt: new Date(Date.now() - 3*60*60*1000).toISOString(), data: { "field-name": "Charlie Brown", "field-email": "charlie@example.com", "field-rating": 3, "field-service": "Service A", "field-comments": "Okay experience." } },
     { id: "resp-4", formId: "form-1", userId: "user-D", submittedAt: new Date(Date.now() - 4*60*60*1000).toISOString(), data: { "field-name": "Diana Prince", "field-email": "diana@example.com", "field-rating": 5, "field-service": "Service C", "field-comments": "" } },
     { id: "resp-5", formId: "form-1", userId: "user-A", submittedAt: new Date(Date.now() - 5*60*60*1000).toISOString(), data: { "field-name": "Alice Smith", "field-email": "alice_diff@example.com", "field-rating": 2, "field-service": "Service A", "field-comments": "Follow-up: Not as good this time." } },
  ],
};

export default function FormResponsesPage() {
  const params = useParams();
  const formId = params.formId as string;

  const [formDefinition, setFormDefinition] = useState<Form | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (formId) {
      // Simulate fetching data
      setTimeout(() => {
        setFormDefinition(mockFormsStore[formId] || null);
        setResponses(mockResponsesStore[formId] || []);
        setIsLoading(false);
      }, 700);
    } else {
      setIsLoading(false);
    }
  }, [formId]);

  const aiFormSchema = useMemo((): AIFormSchema => {
    if (!formDefinition) return {};
    return formDefinition.fields.reduce((acc, field) => {
      acc[field.id] = { label: field.label, type: field.type };
      return acc;
    }, {} as AIFormSchema);
  }, [formDefinition]);

  const aiFormResponses = useMemo((): AIFormResponse[] => {
    return responses.map(r => r.data);
  }, [responses]);


  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-10 w-1/3 mb-2" />
        <Skeleton className="h-6 w-2/3 mb-6" />
        <Skeleton className="h-64 w-full" /> {/* For Table */}
        <Skeleton className="h-48 w-full mt-8" /> {/* For AI Insights */}
      </div>
    );
  }

  if (!formDefinition) {
    return (
      <Alert variant="destructive" className="container mx-auto my-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Form definition not found. It might have been deleted or the ID is incorrect.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">{formDefinition.title} - Responses</h1>
        {formDefinition.description && (
          <p className="text-lg text-muted-foreground mt-1">{formDefinition.description}</p>
        )}
      </header>

      {responses.length === 0 ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No Responses Yet</AlertTitle>
          <AlertDescription>There are currently no responses for this form. Share the form link to start collecting data.</AlertDescription>
        </Alert>
      ) : (
        <>
          <FormResponsesViewer formDefinition={formDefinition} responses={responses} />
          <AIInsights formSchema={aiFormSchema} formResponses={aiFormResponses} />
        </>
      )}
    </div>
  );
}
