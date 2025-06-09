"use client";

import type { FormField as FormFieldType, FormFieldOption } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // Assuming text can be long

interface FormElementProps {
  field: FormFieldType;
  value: any;
  onChange: (fieldId: string, value: any) => void;
  isEditing?: boolean; // For builder UI, not filler
}

export function FormElement({ field, value, onChange, isEditing = false }: FormElementProps) {
  const commonProps = {
    id: field.id,
    placeholder: field.placeholder,
    required: field.required,
    value: value || "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(field.id, e.target.value),
    className: "transition-shadow focus:shadow-md",
    disabled: isEditing, // Disable inputs if in builder/edit mode
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
        // Use Textarea for potentially longer text inputs, or Input for short ones.
        // For simplicity, using Input here. Can be made configurable.
        return <Input type="text" {...commonProps} />;
      case "number":
        return <Input type="number" {...commonProps} onChange={(e) => onChange(field.id, e.target.valueAsNumber)} />;
      case "dropdown":
        return (
          <Select
            value={value || ""}
            onValueChange={(val) => onChange(field.id, val)}
            required={field.required}
            disabled={isEditing}
          >
            <SelectTrigger className={commonProps.className}>
              <SelectValue placeholder={field.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: FormFieldOption) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return <p className="text-destructive">Unsupported field type: {field.type}</p>;
    }
  };

  return (
    <div className="space-y-2 mb-6 p-4 border border-dashed border-border rounded-lg bg-background hover:border-primary/50 transition-colors">
      <Label htmlFor={field.id} className="flex items-center text-md font-medium">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  );
}
