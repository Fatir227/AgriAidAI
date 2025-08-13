import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sun, ShieldCheck, ClipboardCheck } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">An overview of all available AI-powered tools.</p>
        </div>
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/planting-advisor">
                <Card className="h-full hover:border-primary transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sun className="h-6 w-6 text-accent" />
                            AI Planting Advisor
                        </CardTitle>
                        <CardDescription>
                            Get AI-powered planting advice based on your local weather forecast.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Input your crop type, location, and weather forecast to receive intelligent planting recommendations.
                        </p>
                    </CardContent>
                </Card>
            </Link>
             <Link href="/dashboard/plant-disease-detector">
                <Card className="h-full hover:border-primary transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            Plant Disease Detector
                        </CardTitle>
                        <CardDescription>
                            Upload a photo of a plant to detect diseases and get treatment advice.
                        </CardDescription>
                    </CardHeader>
                     <CardContent>
                        <p className="text-sm text-muted-foreground">
                           Our AI will analyze the image to identify potential diseases and suggest treatments.
                        </p>
                    </CardContent>
                </Card>
            </Link>
             <Link href="/dashboard/crop-care-schedule">
                <Card className="h-full hover:border-primary transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardCheck className="h-6 w-6 text-primary" />
                            AI Crop Care Schedule
                        </CardTitle>
                        <CardDescription>
                            Generate a planting, watering, fertilizing, and harvesting schedule for your crops.
                        </CardDescription>
                    </CardHeader>
                     <CardContent>
                        <p className="text-sm text-muted-foreground">
                           Select a crop to receive a detailed care schedule to keep your farm on track for a great harvest.
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </div>
    </div>
  );
}
