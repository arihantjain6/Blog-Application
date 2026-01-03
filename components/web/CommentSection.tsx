"use client"

import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentsSchema } from "@/app/schemas/comments";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function CommentSection() {
    const form = useForm({
            resolver: zodResolver(commentsSchema),
            defaultValues: {
                body: "",
                postId: "",
            },
        });
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b">
                <MessageSquare className="size-5"/>
                <h2 className="text-xl font-bold">5 comments</h2>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <Controller
                            name="body"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Comment</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Share your thoughts" type="text" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Button>Submit</Button>
                </form>
            </CardContent>
        </Card>
    )
}