import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { ArrowRight, MessageSquare, PenLine, Search, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
            <Sparkles className="size-4" />
            <span>Welcome to BlogNest</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Share Your Ideas
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              With the World
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
            Create beautiful blog posts, connect with readers, and build your audience.
            Start your writing journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
            <Link
              href="/create"
              className={buttonVariants({ size: "lg", className: "gap-2 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300" })}
            >
              <PenLine className="size-5" />
              Start Writing
            </Link>
            <Link
              href="/blog"
              className={buttonVariants({ variant: "outline", size: "lg", className: "gap-2 px-8 text-base hover:bg-accent transition-all duration-300" })}
            >
              Browse Posts
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything You Need to <span className="text-primary">Create</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features to help you write, publish, and grow your audience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-card rounded-2xl p-8 border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <PenLine className="size-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Publishing</h3>
                <p className="text-muted-foreground">
                  Create and publish beautiful blog posts with our intuitive editor. Add images, format text, and share with one click.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-card rounded-2xl p-8 border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="size-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
                <p className="text-muted-foreground">
                  Find exactly what you&apos;re looking for with our powerful search. Discover new content and connect with ideas.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-card rounded-2xl p-8 border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="size-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Comments</h3>
                <p className="text-muted-foreground">
                  Engage with your readers through real-time comments. Build a community around your content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Latest Posts
              </h2>
              <p className="text-muted-foreground">
                Discover what our community is writing about
              </p>
            </div>
            <Link
              href="/blog"
              className={buttonVariants({ variant: "ghost", className: "gap-2 hidden sm:flex" })}
            >
              View All
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <RecentPosts />

          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog" className={buttonVariants({ variant: "outline", className: "gap-2" })}>
              View All Posts
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 md:p-16 text-center">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Share Your Story?
              </h2>
              <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Join our community of writers and start creating content that matters.
                It&apos;s free to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/sign-up"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                    className: "px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  })}
                >
                  Get Started Free
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium text-primary-foreground border-2 border-primary-foreground/30 rounded-md hover:bg-primary-foreground/10 transition-all duration-300"
                >
                  Explore Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

async function RecentPosts() {
  const posts = await fetchQuery(api.posts.getPosts);
  const recentPosts = posts?.slice(0, 3);

  if (!recentPosts || recentPosts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No posts yet. Be the first to create one!</p>
        <Link href="/create" className={buttonVariants({ className: "mt-4" })}>
          Create Post
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recentPosts.map((post) => (
        <Card key={post._id} className="pt-0 group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.imageUrl ?? "https://images.unsplash.com/photo-1761019646782-4bc46ba43fe9?q=80&w=1631&auto=format&fit=crop"}
              alt={post.title}
              fill
              className="rounded-t-lg object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>
          <CardContent>
            <Link href={`/blog/${post._id}`}>
              <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-1">{post.title}</h3>
            </Link>
            <p className="text-muted-foreground line-clamp-2 mt-2">{post.body}</p>
          </CardContent>
          <CardFooter>
            <Link className={buttonVariants({ className: "w-full gap-2" })} href={`/blog/${post._id}`}>
              Read More
              <ArrowRight className="size-4" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
