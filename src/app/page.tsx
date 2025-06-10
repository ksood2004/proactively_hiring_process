
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Zap, Users, Lightbulb, FilePlus2, Mail, Phone, ScrollText, ShieldAlert, FileEdit, Share2, Database, TrendingUp, BookOpen, Building, CircleCheckBig } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
              <div className="mx-auto sm:w-full lg:order-last flex flex-col justify-center space-y-4 rounded-xl bg-card p-6 md:p-8 shadow-xl border">
                <h3 className="text-2xl font-bold font-headline text-primary text-center mb-2 md:mb-4">
                  Why Choose FormFlow?
                </h3>
                <div className="space-y-3 md:space-y-4 text-foreground/80">
                  <div className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-accent mr-2.5 mt-1 shrink-0" />
                    <p><span className="font-semibold">Efficiency:</span> Streamline data collection and save valuable time for your team.</p>
                  </div>
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-accent mr-2.5 mt-1 shrink-0" />
                    <p><span className="font-semibold">Insights:</span> Leverage AI to uncover trends and understand your data deeply.</p>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-accent mr-2.5 mt-1 shrink-0" />
                    <p><span className="font-semibold">Collaboration:</span> Work seamlessly with your team on forms in real-time.</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-6 text-center">
                  <Button asChild variant="outline" size="sm" className="hover:shadow-md transition-shadow">
                    <Link href="/#key-features">Explore Features</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="key-features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
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

        {/* User Guide Section */}
        <section id="user-guide" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  User Guide
                </div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  How FormFlow Works
                </h2>
                <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Follow these simple steps to make the most out of FormFlow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:max-w-none mt-12">
              <FeatureCard
                icon={<FileEdit className="h-8 w-8 text-primary" />}
                title="1. Create Your Form"
                description="Use our intuitive drag-and-drop builder to design beautiful and effective forms in minutes."
              />
              <FeatureCard
                icon={<Share2 className="h-8 w-8 text-primary" />}
                title="2. Share with Ease"
                description="Distribute your forms via direct links, email invitations, or embed them on your website."
              />
              <FeatureCard
                icon={<Database className="h-8 w-8 text-primary" />}
                title="3. Collect Responses"
                description="Gather submissions in real-time and manage your data centrally in your dashboard."
              />
              <FeatureCard
                icon={<TrendingUp className="h-8 w-8 text-primary" />}
                title="4. Analyze & Act"
                description="Leverage AI-powered insights and analytics to understand trends and make data-driven decisions."
              />
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="about-us" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  Our Story
                </div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
                  Empowering Data Collection
                </h2>
                <p className="max-w-[700px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At FormFlow, we believe that collecting data should be simple, intelligent, and collaborative. We started with a vision to transform how individuals and businesses gather information, moving beyond clunky spreadsheets and cumbersome tools.
                </p>
                <p className="max-w-[700px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is built on the principles of user-friendliness, powerful AI capabilities, and seamless teamwork. We are passionate about helping you unlock the potential in your data, making every response count.
                </p>
                 <Button asChild variant="outline">
                  <Link href="/contact">Learn More About Us</Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://placehold.co/500x350.png"
                  width={500}
                  height={350}
                  alt="Corporate image for Our Story section"
                  data-ai-hint="corporate"
                  className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-lg"
                />
              </div>
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

    