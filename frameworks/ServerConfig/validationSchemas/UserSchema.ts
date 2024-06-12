import { z } from 'zod';

export const userRegistrationSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  username: z.string(),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
  role: z.enum(['admin', 'customer']),
});

export const userLoginSchema = z.object({
  usernameOrEmailOrPhoneNumber: z.string(),
  password: z.string().min(8),
});