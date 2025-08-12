import { z } from "zod";
export const signInSchema = z.object({
  email: z
    .email({
      error: "Please enter a valid email brev",
    })
    .refine((email) => email.toLowerCase().trim()),
  password: z.string().min(6, {
    error: "Your password must be longer than 6 characters",
  }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
