
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 md:py-24">
        <Card className="shadow-lg">
          <CardHeader className="items-center text-center">
            <MessageSquare className="h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-headline">Contact Us</CardTitle>
            <CardDescription className="text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you! Reach out with any questions, feedback, or inquiries.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-2xl mx-auto space-y-6 text-foreground/80">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-lg text-foreground">Email Us</h3>
                <a href="mailto:ksood2004@gmail.com" className="text-primary hover:underline">
                  ksood2004@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-lg text-foreground">Call Us</h3>
                <a href="tel:+917011795472" className="text-primary hover:underline">
                  +91 70117 95472
                </a>
              </div>
            </div>
            <p className="text-center text-muted-foreground pt-4">
              For general inquiries, please use the email address above. We aim to respond within 24-48 business hours.
            </p>
          </CardContent>
        </Card>
        <div className="text-center mt-10">
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
