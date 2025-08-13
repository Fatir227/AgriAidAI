"use client";

import { useState } from "react";
import Image from "next/image";
import {
  plantDiseaseDetection,
  type PlantDiseaseDetectionOutput,
} from "@/ai/flows/plant-disease-detection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, UploadCloud, Loader2, AlertTriangle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PlantDiseaseDetector() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlantDiseaseDetectionOutput | null>(
    null
  );
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const readFileAsDataURL = (fileToRead: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(fileToRead);
    });
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload an image of a plant.",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const photoDataUri = await readFileAsDataURL(file);
      const res = await plantDiseaseDetection({ photoDataUri });
      setResult(res);
    } catch (error) {
      console.error("Error detecting plant disease:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze the image. Please try another one.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Plant Disease Detector
        </CardTitle>
        <CardDescription>
          Upload a photo of a plant to detect diseases and get treatment
          advice.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plant-photo">Upload Plant Photo</Label>
          <div className="flex items-center gap-4">
             <Input id="plant-photo" type="file" accept="image/*" onChange={handleFileChange} className="flex-1" />
          </div>
        </div>

        {preview && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={preview}
              alt="Plant preview"
              fill
              className="object-cover"
              data-ai-hint="plant agriculture"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-stretch">
        <Button onClick={handleSubmit} disabled={loading || !file} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Diagnose with AI
            </>
          )}
        </Button>
        {result && (
          <div className="mt-4 space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">Diagnosis Result:</h3>
            <div>
              <p className="font-medium text-sm">Disease</p>
              <p className="text-muted-foreground">{result.disease}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Suggested Treatment</p>
              <p className="text-muted-foreground">{result.treatment}</p>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
