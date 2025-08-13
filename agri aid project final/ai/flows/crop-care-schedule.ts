'use server';

/**
 * @fileOverview Crop care schedule generation flow.
 *
 * - generateCropCareSchedule - A function that generates a crop care schedule.
 * - CropCareScheduleInput - The input type for the generateCropCareSchedule function.
 * - CropCareScheduleOutput - The return type for the generateCropCareSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropCareScheduleInputSchema = z.object({
  cropType: z.string().describe('The type of crop to generate a schedule for.'),
});

export type CropCareScheduleInput = z.infer<typeof CropCareScheduleInputSchema>;

const CropCareScheduleOutputSchema = z.object({
  schedule: z.string().describe('The generated crop care schedule.'),
});

export type CropCareScheduleOutput = z.infer<typeof CropCareScheduleOutputSchema>;

export async function generateCropCareSchedule(input: CropCareScheduleInput): Promise<CropCareScheduleOutput> {
  return cropCareScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropCareSchedulePrompt',
  input: {schema: CropCareScheduleInputSchema},
  output: {schema: CropCareScheduleOutputSchema},
  prompt: `You are an expert agricultural advisor. Generate a crop care schedule for the following crop type:\n\nCrop Type: {{{cropType}}}\n\nInclude planting, watering, fertilizing, and harvesting tasks. The schedule should be easy to follow and understand for a farmer. Return the schedule in plain text format.`,
});

const cropCareScheduleFlow = ai.defineFlow(
  {
    name: 'cropCareScheduleFlow',
    inputSchema: CropCareScheduleInputSchema,
    outputSchema: CropCareScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
