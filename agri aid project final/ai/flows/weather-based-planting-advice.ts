// This file is machine-generated - edit with care!
'use server';
/**
 * @fileOverview Provides AI-driven recommendations on optimal planting times based on weather forecasts.
 *
 * - getWeatherBasedPlantingAdvice - A function that returns planting advice based on weather forecasts.
 * - WeatherBasedPlantingAdviceInput - The input type for the getWeatherBasedPlantingAdvice function.
 * - WeatherBasedPlantingAdviceOutput - The return type for the getWeatherBasedPlantingAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherBasedPlantingAdviceInputSchema = z.object({
  cropType: z.string().describe('The type of crop to plant.'),
  location: z.string().describe('The location where the crops will be planted.'),
  weatherForecast: z.string().describe('The weather forecast for the location.'),
});
export type WeatherBasedPlantingAdviceInput = z.infer<typeof WeatherBasedPlantingAdviceInputSchema>;

const WeatherBasedPlantingAdviceOutputSchema = z.object({
  plantingRecommendation: z.string().describe('The recommendation for planting times based on the weather forecast.'),
  pros: z.string().describe('The pros of planting at the recommended time.'),
  cons: z.string().describe('The cons of planting at the recommended time.'),
});
export type WeatherBasedPlantingAdviceOutput = z.infer<typeof WeatherBasedPlantingAdviceOutputSchema>;

export async function getWeatherBasedPlantingAdvice(input: WeatherBasedPlantingAdviceInput): Promise<WeatherBasedPlantingAdviceOutput> {
  return weatherBasedPlantingAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherBasedPlantingAdvicePrompt',
  input: {schema: WeatherBasedPlantingAdviceInputSchema},
  output: {schema: WeatherBasedPlantingAdviceOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the crop type, location, and weather forecast, provide a planting recommendation with pros and cons.\n\nCrop Type: {{{cropType}}}\nLocation: {{{location}}}\nWeather Forecast: {{{weatherForecast}}}\n\nPlanting Recommendation: \nPros:\nCons:\n`,
});

const weatherBasedPlantingAdviceFlow = ai.defineFlow(
  {
    name: 'weatherBasedPlantingAdviceFlow',
    inputSchema: WeatherBasedPlantingAdviceInputSchema,
    outputSchema: WeatherBasedPlantingAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
