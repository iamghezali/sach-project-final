import z from 'zod';
import { apiResponseSchema } from '@/api/schema';

const StatsSchema = z.object({
    in_queue: z.number(),
    completed_count: z.number(),
    potential_earnings: z.string(),
});

export const StatsResponseSchema = apiResponseSchema(StatsSchema);
