import { positive, z } from 'zod';

const historicalDateSchema = z.object({
    id: z.number().int().positive().optional(),
    question: z.string(),
    year: z.number().int().positive(),
});

export type HistoricalDateQuestion = z.infer<typeof historicalDateSchema>;