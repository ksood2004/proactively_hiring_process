"use client";

import type { Form, FormResponse, AIFormSchema, AIFormResponse } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FormResponsesViewerProps {
  formDefinition: Form;
  responses: FormResponse[];
}

export function FormResponsesViewer({ formDefinition, responses }: FormResponsesViewerProps) {
  if (!formDefinition || responses.length === 0) {
    return <p className="text-muted-foreground mt-4">No responses yet for this form.</p>;
  }

  // Prepare headers dynamically from form fields
  const headers = formDefinition.fields.map(field => ({
    id: field.id,
    label: field.label,
  }));

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border shadow-md">
      <Table>
        <TableCaption>A list of responses for "{formDefinition.title}".</TableCaption>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[150px]">Responder</TableHead>
            <TableHead className="w-[180px]">Submitted At</TableHead>
            {headers.map(header => (
              <TableHead key={header.id}>{header.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {responses.map(response => (
            <TableRow key={response.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    {/* In a real app, fetch user photo based on response.userId */}
                    <AvatarImage src={`https://placehold.co/40x40.png?text=${response.userId[0] || 'U'}`} alt={response.userId} />
                    <AvatarFallback>{response.userId[0]?.toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  {response.userId} {/* Or display user's name/email */}
                </div>
              </TableCell>
              <TableCell>{new Date(response.submittedAt).toLocaleString()}</TableCell>
              {headers.map(header => (
                <TableCell key={`${response.id}-${header.id}`}>
                  {String(response.data[header.id] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
