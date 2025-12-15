import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(30, "Password must be at most 30 characters long"),
})

export type SignUpSchema = z.infer<typeof signUpSchema>