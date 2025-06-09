// src/ai/flows/highlight-inconsistencies.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for highlighting inconsistencies across different user responses on a form.
 *
 * - highlightInconsistencies - A function that takes form responses as input and returns a summary of inconsistencies.
 * - HighlightInconsistenciesInput - The input type for the highlightInconsistencies function.
 * - HighlightInconsistenciesOutput - The return type for the highlightInconsistencies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HighlightInconsistenciesInputSchema = z.object({
  formResponses: z.array(
    z.record(z.string(), z.any())
  ).describe('An array of form responses, where each response is a record of field names to their values.'),
  formSchema: z.record(z.string(), z.any()).describe('The schema of the form, defining the expected fields and their types.'),
});

export type HighlightInconsistenciesInput = z.infer<typeof HighlightInconsistenciesInputSchema>;

const HighlightInconsistenciesOutputSchema = z.object({
  summary: z.string().describe('A summary of the inconsistencies found across the form responses.'),
});

export type HighlightInconsistenciesOutput = z.infer<typeof HighlightInconsistenciesOutputSchema>;

export async function highlightInconsistencies(input: HighlightInconsistenciesInput): Promise<HighlightInconsistenciesOutput> {
  return highlightInconsistenciesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'highlightInconsistenciesPrompt',
  input: {schema: HighlightInconsistenciesInputSchema},
  output: {schema: HighlightInconsistenciesOutputSchema},
  prompt: `You are an AI assistant tasked with identifying inconsistencies across multiple responses to the same form.

  Form Schema:
  {{JSON.stringify formSchema}}

  Form Responses:
  {{#each formResponses}}
  Response {{@index}}:
  {{JSON.stringify this}}
  {{/each}}

  Analyze the provided form responses and identify any significant inconsistencies or discrepancies in the answers provided.
  Consider the form schema when analyzing the responses. Provide a concise summary of the identified inconsistencies, highlighting the specific fields and responses where they occur.
  Focus on identifying discrepancies that might indicate errors, misunderstandings, or potentially fraudulent information.

  Summary of Inconsistencies:
  `,
});

const highlightInconsistenciesFlow = ai.defineFlow(
  {
    name: 'highlightInconsistenciesFlow',
    inputSchema: HighlightInconsistenciesInputSchema,
    outputSchema: HighlightInconsistenciesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
