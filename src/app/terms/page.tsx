
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollText } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 md:py-24">
        <Card className="shadow-lg">
          <CardHeader className="items-center text-center">
            <ScrollText className="h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
            <CardDescription className="text-muted-foreground max-w-2xl mx-auto">
              Welcome to FormFlow! These terms and conditions outline the rules and regulations for the use of FormFlow's Website.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-4xl mx-auto space-y-4 text-foreground/80">
            <p>
              By accessing this website we assume you accept these terms and conditions. Do not continue to use FormFlow if you do not agree to take all of the terms and conditions stated on this page.
            </p>
            <h2 className="font-headline text-xl font-semibold text-foreground mt-6 mb-3">Content Liability</h2>
            <p>
              We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
            </p>
            <h2 className="font-headline text-xl font-semibold text-foreground mt-6 mb-3">Your Privacy</h2>
            <p>
              Please read our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
            <h2 className="font-headline text-xl font-semibold text-foreground mt-6 mb-3">Reservation of Rights</h2>
            <p>
              We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
            </p>
            <p className="mt-8 text-center text-muted-foreground">
              (This is a placeholder. You should replace this with your actual Terms of Service.)
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
