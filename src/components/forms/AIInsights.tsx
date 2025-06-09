"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lightbulb, AlertTriangle } from "lucide-react";
import { summarizeFormResponses } from "@/ai/flows/summarize-form-responses";
import { highlightInconsistencies } from "@/ai/flows/highlight-inconsistencies";
import type { AIFormSchema, AIFormResponse } from "@/types";
import { Textarea } from "@/components/ui/textarea";

interface AIInsightsProps {
  formSchema: AIFormSchema;
  formResponses: AIFormResponse[];
}

export function AIInsights({ formSchema, formResponses }: AIInsightsProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [inconsistencies, setInconsistencies] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isLoadingInconsistencies, setIsLoadingInconsistencies] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setIsLoadingSummary(true);
    setError(null);
    setSummary(null);
    try {
      const result = await summarizeFormResponses({ formSchema, formResponses });
      setSummary(result.summary);
    } catch (e) {
      console.error("Error summarizing responses:", e);
      setError("Failed to generate summary. Please try again.");
    }
    setIsLoadingSummary(false);
  };

  const handleHighlightInconsistencies = async () => {
    setIsLoadingInconsistencies(true);
    setError(null);
    setInconsistencies(null);
    try {
      const result = await highlightInconsistencies({ formSchema, formResponses });
      setInconsistencies(result.summary); // The output schema calls it 'summary'
    } catch (e) {
      console.error("Error highlighting inconsistencies:", e);
      setError("Failed to highlight inconsistencies. Please try again.");
    }
    setIsLoadingInconsistencies(false);
  };

  if (formResponses.length === 0) {
    return (
      <Card className="mt-8 bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center text-xl"><Lightbulb className="mr-2 h-6 w-6 text-primary" /> AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No responses yet to analyze.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-headline">
          <Lightbulb className="mr-3 h-7 w-7 text-primary" /> AI-Powered Insights
        </CardTitle>
        <CardDescription>
          Leverage AI to understand your form data better.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && <p className="text-destructive text-sm p-3 bg-destructive/10 rounded-md">{error}</p>}
        
        <div>
          <Button onClick={handleSummarize} disabled={isLoadingSummary || isLoadingInconsistencies} className="w-full sm:w-auto">
            {isLoadingSummary ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-4 w-4" />
            )}
            Summarize Responses
          </Button>
          {summary && (
            <Textarea
              readOnly
              value={summary}
              className="mt-3 h-40 bg-background font-code text-sm"
              placeholder="Summary will appear here..."
            />
          )}
        </div>

        <div>
          <Button onClick={handleHighlightInconsistencies} disabled={isLoadingSummary || isLoadingInconsistencies} className="w-full sm:w-auto">
            {isLoadingInconsistencies ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <AlertTriangle className="mr-2 h-4 w-4" />
            )}
            Highlight Inconsistencies
          </Button>
          {inconsistencies && (
             <Textarea
              readOnly
              value={inconsistencies}
              className="mt-3 h-40 bg-background font-code text-sm"
              placeholder="Inconsistencies will appear here..."
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
