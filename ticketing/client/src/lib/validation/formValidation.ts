import z from 'zod';

// export const signUp = z.object({
//   email: z.string().email(),
//   password: z.string().min(4).max(20),
// });

export const formSchema = z.object({
  email: z.string().email().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(4).max(8),
});

export type FromValue = z.infer<typeof formSchema>;
