import Link from 'next/link';
import { Leaf, Sun, ShieldCheck, ClipboardCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
        <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-2xl font-bold text-foreground">AgriAid AI</h1>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to AgriAid AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Your smart farming assistant. Get AI-powered insights for
                    healthier crops and better yields.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/dashboard/planting-advisor"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
                data-ai-hint="farm landscape"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Our Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Smarter Farming, Simplified
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We leverage cutting-edge AI to provide you with actionable
                  advice for your farm.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
              <Link href="/dashboard/planting-advisor" className="grid gap-2 group">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Sun className="h-6 w-6 text-accent" />
                  <h3 className="group-hover:underline">Planting Advisor</h3>
                </div>
                <p className="text-sm leading-loose text-muted-foreground">
                  Get tailored planting recommendations based on your crop type, location, and local weather forecasts. Maximize your chances of a successful season.
                </p>
              </Link>
              <Link href="/dashboard/plant-disease-detector" className="grid gap-2 group">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h3 className="group-hover:underline">Disease Detector</h3>
                </div>
                <p className="text-sm leading-loose text-muted-foreground">
                  Upload a photo of a plant, and our AI will analyze it to detect potential diseases, offering you suggestions for treatment.
                </p>
              </Link>
              <Link href="/dashboard/crop-care-schedule" className="grid gap-2 group">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                  <h3 className="group-hover:underline">Care Schedule</h3>
                </div>
                <p className="text-sm leading-loose text-muted-foreground">
                  Generate a comprehensive care schedule for your crops, including watering, fertilizing, and harvesting timelines to keep your farm on track.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
