"use client";

import type { FormField, FormFieldOption, FieldType } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Trash2, PlusCircle, GripVertical } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface FormFieldCreatorProps {
  field: FormField;
  onUpdateField: (updatedField: FormField) => void;
  onRemoveField: (fieldId: string) => void;
  index: number; // For display and potential reordering
}

export function FormFieldCreator({ field, onUpdateField, onRemoveField, index }: FormFieldCreatorProps) {
  const [localField, setLocalField] = useState<FormField>(field);

  useEffect(() => {
    setLocalField(field);
  }, [field]);

  const handleChange = (prop: keyof FormField, value: any) => {
    const updated = { ...localField, [prop]: value };
    setLocalField(updated);
    onUpdateField(updated); // Propagate changes up immediately or on blur/save
  };

  const handleOptionChange = (optionIndex: number, prop: keyof FormFieldOption, value: string) => {
    const newOptions = [...(localField.options || [])];
    newOptions[optionIndex] = { ...newOptions[optionIndex], [prop]: value };
    handleChange("options", newOptions);
  };

  const addOption = () => {
    const newOption: FormFieldOption = { 
      id: `opt-${Date.now()}-${Math.random().toString(36).substring(7)}`, 
      label: "", 
      value: "" 
    };
    handleChange("options", [...(localField.options || []), newOption]);
  };

  const removeOption = (optionIndex: number) => {
    const newOptions = (localField.options || []).filter((_, i) => i !== optionIndex);
    handleChange("options", newOptions);
  };
  
  return (
    <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b bg-muted/30 rounded-t-lg">
        <div className="flex items-center">
          <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-grab" />
          <CardTitle className="text-lg font-medium">Field {index + 1}: {localField.type.charAt(0).toUpperCase() + localField.type.slice(1)}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onRemoveField(localField.id)} aria-label="Remove field">
          <Trash2 className="h-5 w-5 text-destructive" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`field-label-${localField.id}`}>Label</Label>
            <Input
              id={`field-label-${localField.id}`}
              value={localField.label}
              onChange={(e) => handleChange("label", e.target.value)}
              placeholder="E.g., Full Name"
            />
          </div>
          <div>
            <Label htmlFor={`field-type-${localField.id}`}>Field Type</Label>
            <Select
              value={localField.type}
              onValueChange={(value: FieldType) => handleChange("type", value)}
            >
              <SelectTrigger id={`field-type-${localField.id}`}>
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="dropdown">Dropdown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor={`field-placeholder-${localField.id}`}>Placeholder (Optional)</Label>
          <Input
            id={`field-placeholder-${localField.id}`}
            value={localField.placeholder || ""}
            onChange={(e) => handleChange("placeholder", e.target.value)}
            placeholder="E.g., Enter your full name"
          />
        </div>
        
        {localField.type === "dropdown" && (
          <div className="space-y-3 pt-2 border-t mt-4">
            <h4 className="font-medium text-md">Dropdown Options</h4>
            {(localField.options || []).map((option, optIndex) => (
              <div key={option.id || optIndex} className="flex items-center gap-2 p-2 border rounded-md bg-background">
                <Input
                  value={option.label}
                  onChange={(e) => handleOptionChange(optIndex, "label", e.target.value)}
                  placeholder="Option Label"
                  className="flex-1"
                />
                <Input
                  value={option.value}
                  onChange={(e) => handleOptionChange(optIndex, "value", e.target.value)}
                  placeholder="Option Value"
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" onClick={() => removeOption(optIndex)} aria-label="Remove option">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addOption} className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Option
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t py-3 px-4">
         <div className="flex items-center space-x-2">
          <Switch
            id={`field-required-${localField.id}`}
            checked={localField.required}
            onCheckedChange={(checked) => handleChange("required", checked)}
          />
          <Label htmlFor={`field-required-${localField.id}`} className="text-sm">Required Field</Label>
        </div>
      </CardFooter>
    </Card>
  );
}
