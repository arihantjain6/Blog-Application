import { Id } from "@/convex/_generated/dataModel";
import z from "zod";


export const commentsSchema = z.object({
    postId: z.custom<Id<'posts'>>(),
    body: z.string().min(3).max(1000),
})