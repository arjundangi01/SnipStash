import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignupFormSchema = z.infer<typeof signupSchema>;

export const signinSchema = signupSchema.omit({ name: true });

export type SigninFormSchema = z.infer<typeof signinSchema>;
