import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().max(34),
  address: z.string().max(123),
  email: z.string().email(),
  phone: z.string().min(10),
});
