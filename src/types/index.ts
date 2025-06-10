
export type FieldType = "text" | "number" | "dropdown";

export interface FormFieldOption {
  id: string;
  value: string;
  label: string;
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required: boolean;
  options?: FormFieldOption[]; // For dropdown type
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  createdBy: string; // userId or identifier
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  responseCount?: number; // Added for mock data consistency
}

export interface FormResponseData {
  [fieldId: string]: any; // fieldId: value
}
export interface FormResponse {
  id: string;
  formId: string;
  userId: string; // User who submitted or collaborated
  data: FormResponseData; 
  submittedAt: string; // ISO date string
}

// For AI insights
export type AIFormSchema = Record<string, { label: string; type: FieldType }>;
export type AIFormResponse = Record<string, any>;

// For Candidate Application
export interface CandidateApplicationData {
  applyingFor?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  degree: string;
  resume?: FileList | null; // Changed to FileList to match input type="file"
  coverLetter?: string;
}

