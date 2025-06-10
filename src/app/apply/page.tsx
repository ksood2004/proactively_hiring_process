
"use client";

import { useSearchParams } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Send, ChevronLeft, User, Mail, Phone, MapPin, GraduationCap, FileText, Paperclip } from "lucide-react";
import type { CandidateApplicationData } from '@/types';
import { useEffect } from 'react';


const applicationSchema = z.object({
  applyingFor: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  degree: z.string().min(2, { message: "Degree/Qualification is required." }),
  resume: z.any().refine(files => files?.length > 0, 'Resume is required.')
                 .refine(files => files?.[0]?.size <= 5 * 1024 * 1024, `Max file size is 5MB.`) // 5MB limit
                 .optional(), // Making it optional if file upload is tricky, then add client-side check
  coverLetter: z.string().optional(),
});


export default function CandidateApplicationPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const jobTitle = searchParams.get('jobTitle');
  const department = searchParams.get('department');
  const location = searchParams.get('location');

  const defaultValues: Partial<CandidateApplicationData> = {
    applyingFor: jobTitle ? `${jobTitle} (${department} - ${location})` : 'General Application',
    name: '',
    email: '',
    phone: '',
    address: '',
    degree: '',
    coverLetter: '',
  };

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CandidateApplicationData>({
    resolver: zodResolver(applicationSchema),
    defaultValues,
  });

  useEffect(() => {
    const applyingForValue = jobTitle ? `${jobTitle} (${department} - ${location})` : 'General Application';
    reset({ ...defaultValues, applyingFor: applyingForValue });
  }, [jobTitle, department, location, reset]);


  const onSubmit: SubmitHandler<CandidateApplicationData> = async (data) => {
    console.log("Application Submitted:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const resumeFile = data.resume?.[0];
    if (resumeFile) {
      console.log("Resume file name:", resumeFile.name);
      console.log("Resume file type:", resumeFile.type);
      console.log("Resume file size:", resumeFile.size);
    }
    
    toast({
      title: "Application Submitted!",
      description: "Thank you for applying. We will review your application and get back to you soon.",
    });
    // reset(); // Optionally reset the form
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 md:py-16">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Briefcase className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">Apply for Position</CardTitle>
            <CardDescription>
              {jobTitle ? `You are applying for: ${jobTitle} (${department} - ${location})` : "Submit your application for future opportunities."}
              <br />
              Please fill out the form below. Fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {jobTitle && (
                <div className="space-y-2">
                  <Label htmlFor="applyingFor" className="flex items-center"><Briefcase className="mr-2 h-4 w-4 text-muted-foreground"/>Applying For</Label>
                  <Input id="applyingFor" {...register("applyingFor")} readOnly className="bg-muted/50"/>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground"/>Full Name *</Label>
                  <Input id="name" {...register("name")} placeholder="e.g., Jane Doe" />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground"/>Email ID *</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="e.g., jane.doe@example.com" />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground"/>Phone Number *</Label>
                  <Input id="phone" type="tel" {...register("phone")} placeholder="e.g., (123) 456-7890" />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="degree" className="flex items-center"><GraduationCap className="mr-2 h-4 w-4 text-muted-foreground"/>Highest Degree/Qualification *</Label>
                  <Input id="degree" {...register("degree")} placeholder="e.g., B.Sc. Computer Science" />
                  {errors.degree && <p className="text-sm text-destructive">{errors.degree.message}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground"/>Address *</Label>
                <Textarea id="address" {...register("address")} placeholder="e.g., 123 Main St, Anytown, USA" />
                {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume" className="flex items-center"><Paperclip className="mr-2 h-4 w-4 text-muted-foreground"/>Resume/CV *</Label>
                <Input id="resume" type="file" {...register("resume")} accept=".pdf,.doc,.docx,.txt" className="pt-2"/>
                {errors.resume && <p className="text-sm text-destructive">{typeof errors.resume.message === 'string' ? errors.resume.message : 'Resume is required.'}</p>}
                <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX, TXT. Max size: 5MB.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter" className="flex items-center"><FileText className="mr-2 h-4 w-4 text-muted-foreground"/>Cover Letter (Optional)</Label>
                <Textarea id="coverLetter" {...register("coverLetter")} placeholder="Tell us why you're a great fit for this role..." rows={5}/>
                {errors.coverLetter && <p className="text-sm text-destructive">{errors.coverLetter.message}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
              <Button type="button" variant="outline" asChild>
                <Link href="/#careers">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back to Job Listings
                </Link>
              </Button>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Send className="mr-2 h-4 w-4 animate-pulse" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Submit Application
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}

