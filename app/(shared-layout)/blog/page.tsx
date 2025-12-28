"use client"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

import Image from "next/image"
import Link from "next/link"
export default function BlogPage() {
    const data = useQuery(api.posts.getPosts)
    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Blog</h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Read our latest blog posts</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.map((post) => (
                    <Card key={post._id} className="pt-0">
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1761019646782-4bc46ba43fe9?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" fill className="rounded-t-lg"/>
                        </div>

                        <CardContent>
                            <Link href={`/blog/${post._id}`}>
                                <h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1></Link>
                            <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                        </CardContent>
                        <CardFooter>
                            <Link className={buttonVariants({ className: "w-full" })} href={`/blog/${post._id}`}>Read More</Link>
                        </CardFooter>

                    </Card>
                ))}

            </div>
        </div>

    )
}
