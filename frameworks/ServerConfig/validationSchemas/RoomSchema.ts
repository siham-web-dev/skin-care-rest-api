import { z } from 'zod';

export const roomSchema = z.object({
  title: z.string().max(34),
});
