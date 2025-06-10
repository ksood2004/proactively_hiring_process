
// src/lib/mockFormStore.ts
import type { Form } from '@/types';

const STORE_KEY = 'formflow-forms';

// Define default mock forms here, which will be used to initialize localStorage if empty
const defaultMockForms: Form[] = [
  {
    id: "form-1",
    title: "Customer Feedback Survey",
    description: "Gather feedback from our valued customers.",
    fields: [
      { id: "field-name", label: "Full Name", type: "text", required: true, placeholder: "E.g., John Doe" },
      { id: "field-email", label: "Email Address", type: "text", required: true, placeholder: "you@example.com" },
      { id: "field-rating", label: "Overall Satisfaction (1-5)", type: "number", required: true, placeholder: "Enter a number between 1 and 5" },
      { 
        id: "field-service", 
        label: "Which service did you use?", 
        type: "dropdown", 
        required: true,
        options: [
          { id: "opt-service-a", label: "Service A", value: "service_a" },
          { id: "opt-service-b", label: "Service B", value: "service_b" },
          { id: "opt-service-c", label: "Service C", value: "service_c" },
        ]
      },
      { id: "field-comments", label: "Additional Comments", type: "text", required: false, placeholder: "Any other thoughts or suggestions..." },
    ],
    createdBy: "mock-user-uid", // Or a generic ID for default forms
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    responseCount: 75,
  },
  {
    id: "form-2",
    title: "Employee Satisfaction Poll",
    description: "Understand employee morale and identify areas for improvement.",
    fields: [
        { id: "field-department", label: "Department", type: "dropdown", required: true, options: [{id: "hr", value:"hr", label:"HR"},{id: "eng", value:"eng", label:"Engineering"}] },
        { id: "field-rating", label: "Rating (1-10)", type: "number", required: true },
    ],
    createdBy: "mock-user-uid",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    responseCount: 120,
  },
];

export function getMockForms(): Form[] {
  if (typeof window === 'undefined') return defaultMockForms; // Return default for SSR or if window is not available
  try {
    const storedForms = localStorage.getItem(STORE_KEY);
    if (storedForms) {
      return JSON.parse(storedForms);
    } else {
      // Initialize localStorage with default forms if it's empty
      localStorage.setItem(STORE_KEY, JSON.stringify(defaultMockForms));
      return defaultMockForms;
    }
  } catch (error) {
    console.error("Error reading forms from localStorage:", error);
    // Fallback to default and try to re-initialize
    localStorage.setItem(STORE_KEY, JSON.stringify(defaultMockForms));
    return defaultMockForms;
  }
}

export function saveMockForms(forms: Form[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(forms));
  } catch (error) {
    console.error("Error saving forms to localStorage:", error);
  }
}

export function addMockForm(form: Form): void {
  const currentForms = getMockForms();
  const updatedForms = [...currentForms, form];
  saveMockForms(updatedForms);
}

export function updateMockForm(updatedForm: Form): void {
  const currentForms = getMockForms();
  const updatedForms = currentForms.map(form =>
    form.id === updatedForm.id ? updatedForm : form
  );
  saveMockForms(updatedForms);
}

export function deleteMockForm(formId: string): void {
  const currentForms = getMockForms();
  const updatedForms = currentForms.filter(form => form.id !== formId);
  saveMockForms(updatedForms);
}

export function getMockFormById(formId: string): Form | undefined {
  const currentForms = getMockForms();
  return currentForms.find(form => form.id === formId);
}
