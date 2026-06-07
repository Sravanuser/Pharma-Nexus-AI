import { z } from "zod";

export const registerSchema = z
    .object({

        firstName: z
            .string()
            .min(3, "First name is required"),

        lastName: z
            .string()
            .min(3, "Last name is required"),

        email: z
            .email("Invalid email address"),

        phone: z
            .string()
            .min(5, "Phone number is required"),

        password: z
            .string()
            .min(6, "Password must be at least 8 characters"),

    })

export type RegisterFormData = z.infer<
    typeof registerSchema
>;