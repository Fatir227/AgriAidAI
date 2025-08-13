"use client";

import { useState } from "react";
import {
  generateCropCareSchedule,
  type CropCareScheduleOutput,
} from "@/ai/flows/crop-care-schedule";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardCheck, Loader2, Sprout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const crops = ["Tomatoes", "Corn", "Wheat", "Potatoes", "Carrots", "Lettuce"];

export function CropCareSchedule() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CropCareScheduleOutput | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!selectedCrop) {
      toast({
        variant: "destructive",
        title: "No crop selected",
        description: "Please select a crop to generate a schedule.",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await generateCropCareSchedule({ cropType: selectedCrop });
      setResult(res);
    } catch (error) {
      console.error("Error generating crop care schedule:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate schedule. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6 text-primary" />
          AI Crop Care Schedule
        </CardTitle>
        <CardDescription>
          Generate a planting, watering, fertilizing, and harvesting schedule
          for your crops.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <label htmlFor="crop-select" className="text-sm font-medium">Crop Type</label>
            <Select onValueChange={setSelectedCrop} value={selectedCrop}>
              <SelectTrigger id="crop-select">
                <SelectValue placeholder="Select a crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmit} disabled={loading || !selectedCrop}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sprout className="mr-2 h-4 w-4" />
                Generate Schedule
              </>
            )}
          </Button>
        </div>
      </CardContent>
      {result && (
        <CardFooter className="flex-col items-start gap-4 border-t pt-6">
          <h3 className="font-headline text-lg font-semibold">
            Care Schedule for {selectedCrop}
          </h3>
          <ScrollArea className="h-72 w-full rounded-md border p-4">
            <pre className="whitespace-pre-wrap text-sm text-foreground/90 font-body">
              {result.schedule}
            </pre>
          </ScrollArea>
        </CardFooter>
      )}
    </Card>
  );
}
