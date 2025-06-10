
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Zap, Users, Lightbulb, FilePlus2, Mail, Phone, ScrollText, ShieldAlert } from "lucide-react"; // Added ScrollText and ShieldAlert
import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Build, Collaborate, Innovate with FormFlow
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    Create dynamic forms, collaborate in real-time, and gain AI-powered insights from your data. Streamline your workflow with FormFlow.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="shadow-lg hover:shadow-primary/40 transition-shadow">
                    <Link href="/signup">
                      Get Started Free
                      <Zap className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-shadow">
                    <Link href="/dashboard">
                      Explore Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Form Collaboration"
                data-ai-hint="corporate team"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  Everything You Need for Effective Forms
                </h2>
                <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From intuitive form building to advanced AI insights, FormFlow empowers your team.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <FeatureCard
                icon={<FilePlus2 className="h-8 w-8 text-primary" />}
                title="Intuitive Form Builder"
                description="Easily create custom forms with various field types like text, number, and dropdowns. No coding required."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Real-time Collaboration"
                description="Work together on forms simultaneously. See changes live and ensure everyone is on the same page."
              />
              <FeatureCard
                icon={<Lightbulb className="h-8 w-8 text-primary" />}
                title="AI-Powered Insights"
                description="Unlock valuable information from your responses with AI summaries and inconsistency detection."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4 rounded-full bg-primary/10 p-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t bg-background">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-foreground/70">
        <div>
          <h4 className="font-semibold text-foreground mb-2">FormFlow</h4>
          <p>&copy; {new Date().getFullYear()} FormFlow. All rights reserved.</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">Contact Us</h4>
          <ul className="space-y-1">
            <li className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-primary" />
              <a href="mailto:ksood2004@gmail.com" className="hover:text-primary transition-colors">ksood2004@gmail.com</a>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-primary" />
              <a href="tel:+917011795472" className="hover:text-primary transition-colors">7011795472</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

