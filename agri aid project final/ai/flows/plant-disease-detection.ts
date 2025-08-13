'use server';

/**
 * @fileOverview An AI agent to detect plant diseases from an image and suggest treatments.
 *
 * - plantDiseaseDetection - A function that handles the plant disease detection process.
 * - PlantDiseaseDetectionInput - The input type for the plantDiseaseDetection function.
 * - PlantDiseaseDetectionOutput - The return type for the plantDiseaseDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlantDiseaseDetectionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PlantDiseaseDetectionInput = z.infer<typeof PlantDiseaseDetectionInputSchema>;

const PlantDiseaseDetectionOutputSchema = z.object({
  disease: z.string().describe('The identified disease, if any.'),
  treatment: z.string().describe('Suggested treatment for the disease.'),
});
export type PlantDiseaseDetectionOutput = z.infer<typeof PlantDiseaseDetectionOutputSchema>;

export async function plantDiseaseDetection(
  input: PlantDiseaseDetectionInput
): Promise<PlantDiseaseDetectionOutput> {
  return plantDiseaseDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'plantDiseaseDetectionPrompt',
  input: {schema: PlantDiseaseDetectionInputSchema},
  output: {schema: PlantDiseaseDetectionOutputSchema},
  prompt: `You are an expert in plant diseases.

  Analyze the provided image of a plant and identify any potential diseases.  Based on your diagnosis, suggest appropriate treatments.

  Here is the plant image: {{media url=photoDataUri}}

  Respond with the disease name and treatment. If there is no disease, indicate that the plant is healthy.
  `,
});

const plantDiseaseDetectionFlow = ai.defineFlow(
  {
    name: 'plantDiseaseDetectionFlow',
    inputSchema: PlantDiseaseDetectionInputSchema,
    outputSchema: PlantDiseaseDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
