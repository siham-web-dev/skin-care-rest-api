import { z } from 'zod';

export const ProductSchema = z.object({
    name: z.string().min(4).max(45),
    description: z.string().min(62).max(400),
    ingredients: z.string().min(74).max(400),
    how_to_use: z.string().min(56).max(400),
    quantity: z.string().regex(/^\d+$/).transform((value) => parseInt(value)),
    price: z.string().transform((value) => parseFloat(value))
});
