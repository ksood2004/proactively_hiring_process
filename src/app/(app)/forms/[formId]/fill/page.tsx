"use client";

import { FormFiller } from "@/components/forms/FormFiller";
import type { Form, FormResponseData } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock form definitions - in a real app, fetch this based on formId
const mockForms: Record<string, Form> = {
  "form-1": {
    id: "form-1",
    title: "Customer Feedback Survey",
    description: "We value your opinion! Please take a few moments to share your feedback with us. Your responses will help us improve our services.",
    fields: [
      { id: "field-name", label: "Full Name", type: "text", required: true, placeholder: "E.g., John Doe" },
      { id: "field-email", label: "Email Address", type: "text", required: true, placeholder: "you@example.com" },
      { id: "field-rating", label: "Overall Satisfaction (1-5)", type: "number", required: true, placeholder: "Enter a number between 1 and 5" },
      { 
        id: "field-service", 
        label: "Which service did you use?", 
        type: "dropdown", 
        required: true,
        options: [
          { id: "opt-service-a", label: "Service A", value: "service_a" },
          { id: "opt-service-b", label: "Service B", value: "service_b" },
          { id: "opt-service-c", label: "Service C", value: "service_c" },
        ]
      },
      { id: "field-comments", label: "Additional Comments", type: "text", required: false, placeholder: "Any other thoughts or suggestions..." },
    ],
    createdBy: "user-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

// Mock submit function
const mockSubmitResponse = async (responseData: FormResponseData) => {
  console.log("Submitting response (mock):", responseData);
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

  useEffect(() => {
    if (formId) {
      // Simulate fetching form definition
      setTimeout(() => {
        const foundForm = mockForms[formId];
        setFormDefinition(foundForm || null);
        setIsLoading(false);
      }, 500);
    } else {
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

  if (!formDefinition) {
    return <div className="container mx-auto py-8 text-center text-xl">Form not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <FormFiller 
        formDefinition={formDefinition} 
        onSubmit={mockSubmitResponse}
        onFieldChange={mockFieldChange} // For real-time collaboration
      />
    </div>
  );
}
