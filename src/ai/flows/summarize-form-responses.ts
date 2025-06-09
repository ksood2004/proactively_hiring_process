// src/ai/flows/summarize-form-responses.ts
'use server';

/**
 * @fileOverview Summarizes user responses on a form to highlight key information and inconsistencies.
 *
 * - summarizeFormResponses - A function that handles the summarization of form responses.
 * - SummarizeFormResponsesInput - The input type for the summarizeFormResponses function.
 * - SummarizeFormResponsesOutput - The return type for the summarizeFormResponses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFormResponsesInputSchema = z.object({
  formResponses: z.array(z.record(z.string(), z.any())).describe('An array of form responses, where each response is a key-value pair of field ID to response value.'),
  formSchema: z.record(z.string(), z.any()).describe('The schema of the form, where each field ID is mapped to its type and description.'),
});

export type SummarizeFormResponsesInput = z.infer<typeof SummarizeFormResponsesInputSchema>;

const SummarizeFormResponsesOutputSchema = z.object({
  summary: z.string().describe('A summary of the key information and inconsistencies across the form responses.'),
});

export type SummarizeFormResponsesOutput = z.infer<typeof SummarizeFormResponsesOutputSchema>;

export async function summarizeFormResponses(input: SummarizeFormResponsesInput): Promise<SummarizeFormResponsesOutput> {
  return summarizeFormResponsesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeFormResponsesPrompt',
  input: {schema: SummarizeFormResponsesInputSchema},
  output: {schema: SummarizeFormResponsesOutputSchema},
  prompt: `You are an AI assistant helping an administrator understand form responses.

You are provided with an array of form responses and the form schema.

Form Schema:
{{formSchema}}

Form Responses:
{{#each formResponses}}
  Response {{@index}}:
  {{#each this}}
    {{@key}}: {{this}}
  {{/each}}
{{/each}}

Summarize the key information and highlight any inconsistencies across the responses. Focus on identifying trends and insights that the administrator should be aware of.

Summary:`, 
});

const summarizeFormResponsesFlow = ai.defineFlow(
  {
    name: 'summarizeFormResponsesFlow',
    inputSchema: SummarizeFormResponsesInputSchema,
    outputSchema: SummarizeFormResponsesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
