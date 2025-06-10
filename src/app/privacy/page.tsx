
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 md:py-24">
        <Card className="shadow-lg">
          <CardHeader className="items-center text-center">
            <ShieldAlert className="h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
            <CardDescription className="text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. It is FormFlow's policy to respect your privacy regarding any information we may collect from you across our website.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-4xl mx-auto space-y-4 text-foreground/80">
            <p>
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
            </p>
            <h2 className="font-headline text-xl font-semibold text-foreground mt-6 mb-3">Information We Collect</h2>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
             <h2 className="font-headline text-xl font-semibold text-foreground mt-6 mb-3">How We Use Your Information</h2>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-5">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
            </ul>
            <p className="mt-8 text-center text-muted-foreground">
              (This is a placeholder. You should replace this with your actual Privacy Policy.)
            </p>
          </CardContent>
        </Card>
         <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
