import z from "zod";

export const LoginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(3,"password is required")
});

export type LoginFormData = z.infer<typeof LoginSchema>;