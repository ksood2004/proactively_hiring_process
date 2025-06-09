"use client";

import type { Form, FormField, FieldType } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldCreator } from "./FormFieldCreator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Save, FileText, HashIcon, ChevronDownSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext"; // To get current user for createdBy
import { useRouter } from "next/navigation";

interface FormBuilderProps {
  initialForm?: Form; // For editing existing forms
  onSave: (form: Form) => Promise<void>; // Async to simulate API call
}

const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export function FormBuilder({ initialForm, onSave }: FormBuilderProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [formTitle, setFormTitle] = useState(initialForm?.title || "");
  const [formDescription, setFormDescription] = useState(initialForm?.description || "");
  const [fields, setFields] = useState<FormField[]>(initialForm?.fields || []);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialForm) {
      setFormTitle(initialForm.title);
      setFormDescription(initialForm.description || "");
      setFields(initialForm.fields);
    }
  }, [initialForm]);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: generateId(),
      label: "",
      type,
      required: false,
      placeholder: "",
      ...(type === "dropdown" && { options: [] }),
    };
    setFields([...fields, newField]);
  };

  const updateField = (updatedField: FormField) => {
    setFields(fields.map(f => f.id === updatedField.id ? updatedField : f));
  };

  const removeField = (fieldId: string) => {
    setFields(fields.filter(f => f.id !== fieldId));
  };

  const handleSaveForm = async () => {
    if (!formTitle.trim()) {
      toast({ title: "Validation Error", description: "Form title is required.", variant: "destructive" });
      return;
    }
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to save a form.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    const formToSave: Form = {
      id: initialForm?.id || generateId(),
      title: formTitle,
      description: formDescription,
      fields,
      createdBy: user.uid,
      createdAt: initialForm?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await onSave(formToSave); // Call the provided onSave prop
      toast({ title: "Form Saved!", description: `"${formTitle}" has been saved successfully.` });
      // Potentially redirect or clear form
      // For this example, let's redirect to dashboard after save
      router.push('/dashboard');
    } catch (error) {
      console.error("Failed to save form:", error);
      toast({ title: "Save Failed", description: "Could not save the form. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            {initialForm ? "Edit Form" : "Create New Form"}
          </CardTitle>
          <CardDescription>
            Design your form by adding a title, description, and various fields.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="form-title" className="text-lg">Form Title</Label>
            <Input
              id="form-title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Enter form title"
              className="text-xl py-3 h-auto"
            />
          </div>
          <div>
            <Label htmlFor="form-description" className="text-lg">Form Description (Optional)</Label>
            <Textarea
              id="form-description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Enter a brief description for your form"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-headline">Form Fields</CardTitle>
          <CardDescription>Add and configure the fields for your form.</CardDescription>
        </CardHeader>
        <CardContent>
          {fields.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No fields added yet. Click a button below to add one.</p>
          )}
          {fields.map((field, index) => (
            <FormFieldCreator
              key={field.id}
              field={field}
              onUpdateField={updateField}
              onRemoveField={removeField}
              index={index}
            />
          ))}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center items-center gap-3 border-t pt-6">
            <h3 className="text-md font-medium text-muted-foreground mb-2 sm:mb-0 sm:mr-4">Add New Field:</h3>
            <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" onClick={() => addField("text")} className="shadow-sm hover:shadow-md">
                    <FileText className="mr-2 h-4 w-4" /> Text
                </Button>
                <Button variant="outline" onClick={() => addField("number")} className="shadow-sm hover:shadow-md">
                    <HashIcon className="mr-2 h-4 w-4" /> Number
                </Button>
                <Button variant="outline" onClick={() => addField("dropdown")} className="shadow-sm hover:shadow-md">
                    <ChevronDownSquare className="mr-2 h-4 w-4" /> Dropdown
                </Button>
            </div>
        </CardFooter>
      </Card>

      <div className="flex justify-end mt-8">
        <Button size="lg" onClick={handleSaveForm} disabled={isSaving} className="shadow-lg hover:shadow-primary/40 transition-shadow">
          {isSaving ? <Save className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
          {initialForm ? "Update Form" : "Save Form"}
        </Button>
      </div>
    </div>
  );
}
