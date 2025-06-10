
"use client";

import { FormBuilder } from "@/components/forms/FormBuilder";
import type { Form } from "@/types";
import { addMockForm } from "@/lib/mockFormStore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Updated save function to use mockFormStore
const saveNewForm = async (form: Form): Promise<void> => {
  console.log("Saving new form (mock with localStorage):", form);
  addMockForm(form);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
};

export default function CreateFormPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSave = async (form: Form) => {
    try {
      await saveNewForm(form);
      toast({ title: "Form Created!", description: `"${form.title}" has been saved successfully.` });
      router.push('/dashboard'); // Redirect to dashboard after successful save
    } catch (error) {
      console.error("Failed to save form:", error);
      toast({ title: "Save Failed", description: "Could not save the form. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <FormBuilder onSave={handleSave} />
    </div>
  );
}
