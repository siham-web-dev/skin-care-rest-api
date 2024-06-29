import { z } from 'zod';

export const addCompanySchema = z.object({
  name: z.string().max(34),
  address: z.string().max(123),
  userId: z.string().regex(/^\d+$/).transform(Number),
  email: z.string().email(),
  phone: z.string().min(10),
});

export const updateCompanySchema = z.object({
  name: z.string().max(34),
  address: z.string().max(123),
  email: z.string().email(),
  phone: z.string().min(10),
})