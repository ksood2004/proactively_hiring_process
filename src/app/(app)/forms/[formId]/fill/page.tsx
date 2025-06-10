
"use client";

import { FormFiller } from "@/components/forms/FormFiller";
import type { Form, FormResponseData } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getMockFormById } from "@/lib/mockFormStore"; // Use centralized store
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

// Mock submit function - this would interact with a responses store in a real app
const mockSubmitResponse = async (responseData: FormResponseData) => {
  console.log("Submitting response (mock):", responseData);
  // In a real app, save responseData associated with formId and userId
  await new Promise(resolve => setTimeout(resolve, 1000));
};

// Mock function for real-time field changes (would interact with Firebase/backend)
const mockFieldChange = (fieldId: string, value: any) => {
  console.log(`Field ${fieldId} changed to:`, value);
};

export default function FillFormPage() {
  const params = useParams();
  const formId = params.formId as string;
  const [formDefinition, setFormDefinition] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formId) {
      setIsLoading(true);
      // Simulate fetching form definition from localStorage store
      setTimeout(() => { // Keep timeout for realistic loading feel
        const foundForm = getMockFormById(formId);
        if (foundForm) {
          setFormDefinition(foundForm);
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

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-8" />
        <div className="space-y-6">
          {[1,2,3].map(i => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-12 w-32 mt-8" />
      </div>
    );
  }

  if (error || !formDefinition) {
    return (
      <Alert variant="destructive" className="container mx-auto my-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || "Form not found. It might have been deleted or the ID is incorrect."}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <FormFiller 
        formDefinition={formDefinition} 
        onSubmit={mockSubmitResponse}
        onFieldChange={mockFieldChange} 
      />
    </div>
  );
}
