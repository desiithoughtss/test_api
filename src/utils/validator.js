import { z } from "zod";

const SignupSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password do not match ",
    path: ["confirmPassword"],
  });

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { SignupSchema, LoginSchema };
