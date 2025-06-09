"use client";

import type { Form, FormField as FormFieldType, FormResponseData } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormElement } from "./FormElement";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface FormFillerProps {
  formDefinition: Form;
  initialResponseData?: FormResponseData; // For pre-filled or collaborative editing
  onSubmit: (responseData: FormResponseData) => Promise<void>;
  onFieldChange?: (fieldId: string, value: any) => void; // For real-time collaboration
}

export function FormFiller({ formDefinition, initialResponseData, onSubmit, onFieldChange }: FormFillerProps) {
  const [responseData, setResponseData] = useState<FormResponseData>(initialResponseData || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (initialResponseData) {
      setResponseData(initialResponseData);
    } else {
      // Initialize responseData with empty strings or default values based on field types
      const initialData: FormResponseData = {};
      formDefinition.fields.forEach(field => {
        initialData[field.id] = field.type === 'number' ? undefined : ''; // Or specific defaults
      });
      setResponseData(initialData);
    }
  }, [formDefinition, initialResponseData]);

  const handleInputChange = (fieldId: string, value: any) => {
    setResponseData(prev => ({ ...prev, [fieldId]: value }));
    if (onFieldChange) {
      onFieldChange(fieldId, value); // For real-time updates
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to submit a form.", variant: "destructive" });
      return;
    }

    // Basic validation: check required fields
    for (const field of formDefinition.fields) {
      if (field.required && (responseData[field.id] === undefined || responseData[field.id] === '')) {
        toast({ title: "Validation Error", description: `Field "${field.label}" is required.`, variant: "destructive" });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await onSubmit(responseData);
      toast({ title: "Form Submitted!", description: "Your response has been recorded." });
      // Optionally clear form or redirect
    } catch (error) {
      console.error("Failed to submit form:", error);
      toast({ title: "Submission Failed", description: "Could not submit your response. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline">{formDefinition.title}</CardTitle>
        {formDefinition.description && (
          <CardDescription className="text-md">{formDefinition.description}</CardDescription>
        )}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-1"> {/* Reduced space between elements for better density */}
          {formDefinition.fields.map((field: FormFieldType) => (
            <FormElement
              key={field.id}
              field={field}
              value={responseData[field.id]}
              onChange={handleInputChange}
            />
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting} size="lg">
            {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
            Submit Response
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
