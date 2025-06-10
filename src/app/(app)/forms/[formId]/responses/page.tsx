
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { FormResponsesViewer } from "@/components/forms/FormResponsesViewer";
import { AIInsights } from "@/components/forms/AIInsights";
import type { Form, FormResponse, AIFormSchema, AIFormResponse } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getMockFormById } from "@/lib/mockFormStore"; // Use centralized store

// Mock responses store - this can remain separate for now or be integrated later
const mockResponsesStore: Record<string, FormResponse[]> = {
  "form-1": [
    { id: "resp-1", formId: "form-1", userId: "user-A", submittedAt: new Date(Date.now() - 1*60*60*1000).toISOString(), data: { "field-name": "Alice Smith", "field-email": "alice@example.com", "field-rating": 5, "field-service": "service_a", "field-comments": "Great service!" } },
    { id: "resp-2", formId: "form-1", userId: "user-B", submittedAt: new Date(Date.now() - 2*60*60*1000).toISOString(), data: { "field-name": "Bob Johnson", "field-email": "bob@example.com", "field-rating": 4, "field-service": "service_b", "field-comments": "Good, but could be faster." } },
    { id: "resp-3", formId: "form-1", userId: "user-C", submittedAt: new Date(Date.now() - 3*60*60*1000).toISOString(), data: { "field-name": "Charlie Brown", "field-email": "charlie@example.com", "field-rating": 3, "field-service": "service_a", "field-comments": "Okay experience." } },
    { id: "resp-4", formId: "form-1", userId: "user-D", submittedAt: new Date(Date.now() - 4*60*60*1000).toISOString(), data: { "field-name": "Diana Prince", "field-email": "diana@example.com", "field-rating": 5, "field-service": "service_c", "field-comments": "" } },
    { id: "resp-5", formId: "form-1", userId: "user-A", submittedAt: new Date(Date.now() - 5*60*60*1000).toISOString(), data: { "field-name": "Alice Smith", "field-email": "alice_diff@example.com", "field-rating": 2, "field-service": "service_a", "field-comments": "Follow-up: Not as good this time." } },
  ],
   "form-2": [
    { id: "resp-f2-1", formId: "form-2", userId: "user-X", submittedAt: new Date(Date.now() - 1*60*60*1000).toISOString(), data: { "field-department": "eng", "field-rating": 8 } },
  ]
};

export default function FormResponsesPage() {
  const params = useParams();
  const formId = params.formId as string;

  const [formDefinition, setFormDefinition] = useState<Form | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formId) {
      setIsLoading(true);
      // Simulate fetching data
      setTimeout(() => { // Keep timeout for realistic loading feel
        const foundForm = getMockFormById(formId);
        if (foundForm) {
          setFormDefinition(foundForm);
          setResponses(mockResponsesStore[formId] || []); // Keep using mockResponsesStore for now
        } else {
          setError("Form definition not found.");
        }
        setIsLoading(false);
      }, 200); // Reduced delay
    } else {
      setError("No form ID provided.");
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

  if (error || !formDefinition) {
    return (
      <Alert variant="destructive" className="container mx-auto my-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || "Form definition not found. It might have been deleted or the ID is incorrect."}</AlertDescription>
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
