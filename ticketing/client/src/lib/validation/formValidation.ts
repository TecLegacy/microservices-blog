import z from 'zod';

export const signUp = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});
