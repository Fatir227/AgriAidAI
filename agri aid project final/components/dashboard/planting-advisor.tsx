"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  getWeatherBasedPlantingAdvice,
  type WeatherBasedPlantingAdviceOutput,
} from "@/ai/flows/weather-based-planting-advice";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Loader2, ThumbsDown, ThumbsUp, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  cropType: z.string().min(1, "Please select a crop type."),
  location: z.string().min(1, "Please enter a location."),
  weatherForecast: z
    .string()
    .min(10, "Please provide a more detailed weather forecast."),
});

const crops = ["Tomatoes", "Corn", "Wheat", "Potatoes", "Carrots", "Lettuce"];

export function PlantingAdvisor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<WeatherBasedPlantingAdviceOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: "",
      location: "",
      weatherForecast: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const res = await getWeatherBasedPlantingAdvice(values);
      setResult(res);
    } catch (error) {
      console.error("Error getting planting advice:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get planting advice. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a crop" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (e.g., City, State)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Fresno, California" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="weatherForecast"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weather Forecast</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Sunny, high of 75°F, low of 55°F, 10% chance of rain for the next 7 days."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Advice...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Ask AI
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {result && (
        <CardFooter className="flex flex-col items-start gap-4 border-t pt-6">
          <h3 className="font-headline text-lg font-semibold">
            AI Recommendation
          </h3>
          <p className="text-foreground/90">{result.plantingRecommendation}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-green-600">
                  <ThumbsUp className="h-5 w-5" />
                  Pros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{result.pros}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-red-600">
                  <ThumbsDown className="h-5 w-5" />
                  Cons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{result.cons}</p>
              </CardContent>
            </Card>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
