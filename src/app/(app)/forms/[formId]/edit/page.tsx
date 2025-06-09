"use client";

import { FormBuilder } from "@/components/forms/FormBuilder";
import type { Form } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

// Mock data store for forms - in a real app, this would be fetched from a database
const mockFormsStore: Record<string, Form> = {
  "form-1": {
    id: "form-1",
    title: "Customer Feedback Survey (Editable)",
    description: "Gather feedback from our valued customers.",
    fields: [
      { id: "field-name", label: "Full Name", type: "text", required: true, placeholder: "E.g., John Doe" },
      { id: "field-email", label: "Email Address", type: "text", required: true, placeholder: "you@example.com" },
    ],
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  "form-2": {
    id: "form-2",
    title: "Employee Satisfaction Poll (Editable)",
    description: "Understand employee morale.",
    fields: [
      { id: "field-department", label: "Department", type: "dropdown", required: true, options: [{id: "hr", value:"hr", label:"HR"},{id: "eng", value:"eng", label:"Engineering"}] },
      { id: "field-rating", label: "Rating (1-10)", type: "number", required: true },
    ],
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

// Mock save function for now
const mockUpdateForm = async (form: Form): Promise<void> => {
  console.log("Updating form (mock):", form);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you'd update in Firebase/backend here
  // For example: await updateFormInFirebase(form);
  mockFormsStore[form.id] = form; // Update in mock store
};

export default function EditFormPage() {
  const params = useParams();
  const formId = params.formId as string;
  const [initialForm, setInitialForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formId) {
      // Simulate fetching form data
      setTimeout(() => {
        const formToEdit = mockFormsStore[formId];
        if (formToEdit) {
          setInitialForm(formToEdit);
        } else {
          setError("Form not found.");
        }
        setIsLoading(false);
      }, 500);
    } else {
        setError("No form ID provided.");
        setIsLoading(false);
    }
  }, [formId]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-10 w-1/3 mb-2" />
        <Skeleton className="h-6 w-2/3 mb-6" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
     return (
      <Alert variant="destructive" className="container mx-auto my-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Loading Form</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (!initialForm) {
    // Should be caught by error state, but as a fallback:
    return (
         <Alert variant="destructive" className="container mx-auto my-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Could not load the form for editing.</AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <FormBuilder initialForm={initialForm} onSave={mockUpdateForm} />
    </div>
  );
}
