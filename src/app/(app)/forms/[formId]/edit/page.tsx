
"use client";

import { FormBuilder } from "@/components/forms/FormBuilder";
import type { Form } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { getMockFormById, updateMockForm } from "@/lib/mockFormStore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


// Updated save function for editing forms
const saveUpdatedForm = async (form: Form): Promise<void> => {
  console.log("Updating form (mock with localStorage):", form);
  updateMockForm(form);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
};

export default function EditFormPage() {
  const params = useParams();
  const formId = params.formId as string;
  const [initialForm, setInitialForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (formId) {
      setIsLoading(true);
      // Simulate fetching form data from localStorage store
      setTimeout(() => { // Keep timeout for realistic loading feel
        const formToEdit = getMockFormById(formId);
        if (formToEdit) {
          setInitialForm(formToEdit);
        } else {
          setError("Form not found in mock store.");
        }
        setIsLoading(false);
      }, 200); // Reduced delay
    } else {
        setError("No form ID provided.");
        setIsLoading(false);
    }
  }, [formId]);

  const handleSave = async (form: Form) => {
    try {
      await saveUpdatedForm(form);
      toast({ title: "Form Updated!", description: `"${form.title}" has been updated successfully.` });
      router.push('/dashboard');
    } catch (e) {
      console.error("Failed to update form:", e);
      toast({ title: "Update Failed", description: "Could not update the form. Please try again.", variant: "destructive" });
    }
  };

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
    return (
         <Alert variant="destructive" className="container mx-auto my-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Could not load the form for editing. It may not exist.</AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <FormBuilder initialForm={initialForm} onSave={handleSave} />
    </div>
  );
}
