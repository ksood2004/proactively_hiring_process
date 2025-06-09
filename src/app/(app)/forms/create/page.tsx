"use client";

import { FormBuilder } from "@/components/forms/FormBuilder";
import type { Form } from "@/types";
// import { saveFormToFirebase } from "@/lib/firebase"; // Example of actual save function

// Mock save function for now
const mockSaveForm = async (form: Form): Promise<void> => {
  console.log("Saving form (mock):", form);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you'd save to Firebase/backend here
  // For example: await saveFormToFirebase(form); 
};


export default function CreateFormPage() {
  return (
    <div className="container mx-auto py-8">
      <FormBuilder onSave={mockSaveForm} />
    </div>
  );
}
