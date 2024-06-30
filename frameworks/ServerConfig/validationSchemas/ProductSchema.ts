import { z } from 'zod';

export const ProductSchema = z.object({
    name: z.string().max(34),
    description: z.string().min(100).max(1000),
    ingredients: z.string().min(200).max(2000),
    how_to_use: z.string().min(400).max(3000),
    quantity: z.string().regex(/^\d+$/).transform((value) => parseInt(value)),
    price: z.string().regex(/^\d+.\d{2}$/).transform((value) => parseFloat(value))
});
