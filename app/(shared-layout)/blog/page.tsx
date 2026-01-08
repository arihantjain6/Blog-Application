
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { Metadata } from "next"
// import { cacheLife, cacheTag } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { connection } from "next/server"
import { Suspense } from "react"


// export const dynamic = "force-static";
// export const revalidate = 30;
// false | 0 | number
// 'auto' | 'force-static' | 'error' | 'force-dynamic'

export const metadata: Metadata = {
    title: "Blog | Next.js",
    description: "Read our latest blog posts",
    category: "Blog",
    authors: [{ name: "test-2" }]
};

export default function BlogPage() {

    return (
        <div className="py-3">
            {/* Hero Header Section */}
            <div className="relative text-center pb-6">
                {/* Decorative background */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <BookOpen className="size-4" />
                    <span>Explore Our Stories</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                    <span className="bg-linear-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">&ldquo;Ideas Worth </span>
                    <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">Sharing</span>
                    <span className="bg-linear-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">&rdquo;</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                    Every great story starts with a single idea. Discover yours here.
                </p>
            </div>

            {/* Blog Grid */}
            <Suspense fallback={<SkeletonLoadingUi />}>
                <LoadBlogList />
            </Suspense>
        </div>

    )
}

async function LoadBlogList() {
    "use cache";
    cacheLife("hours");
    cacheTag("blog");
    const data = await fetchQuery(api.posts.getPosts)

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-muted mb-6">
                    <Sparkles className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-6">Be the first to share your ideas!</p>
                <Link href="/create" className={buttonVariants()}>
                    Create Your First Post
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((post, index) => (
                <Card
                    key={post._id}
                    className="group pt-0 overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    {/* Image Container */}
                    <div className="relative h-52 w-full overflow-hidden">
                        <Image
                            src={post.imageUrl ?? "https://images.unsplash.com/photo-1761019646782-4bc46ba43fe9?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            unoptimized
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="pt-6">
                        <Link href={`/blog/${post._id}`} className="block group/title">
                            <h2 className="text-xl font-bold line-clamp-2 group-hover/title:text-primary transition-colors duration-300">
                                {post.title}
                            </h2>
                        </Link>
                        <p className="text-muted-foreground line-clamp-3 mt-3 text-sm leading-relaxed">
                            {post.body}
                        </p>
                    </CardContent>

                    <CardFooter className="pt-0">
                        <Link
                            className={buttonVariants({
                                variant: "ghost",
                                className: "w-full justify-between group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            })}
                            href={`/blog/${post._id}`}
                        >
                            <span>Read Article</span>
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                    </CardFooter>

                </Card>
            ))}

        </div>
    )
}
function SkeletonLoadingUi() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <div className="flex flex-col space-y-3" key={i}>
                    <Skeleton className="h-48 w-full" />
                    <div className="space-y-2 flex flex-col">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-2 w-2/3" />
                    </div>
                </div>
            ))}
        </div>
    )
}