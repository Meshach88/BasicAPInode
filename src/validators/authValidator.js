import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(3, 'Your name must be at least 3 characters.'),
    email: z.string().email("Invalid email"),
    password: z.string().min(6)
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6)
})
