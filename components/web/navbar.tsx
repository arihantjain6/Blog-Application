"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";

export default function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    return (
        <nav className="flex justify-between w-full py-5">
            <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="BlogNest Logo"
                        width={40}
                        height={40}
                        className="rounded-lg"
                    />
                    <h1 className="text-3xl font-bold">
                        Blog<span className="text-primary">Nest</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost" })} href="/">Home</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/blog">Blog</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/create">Create</Link>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="hidden md:block mr-2">
                    <SearchInput />
                </div>
                {isLoading ? null : isAuthenticated ? (
                    <Button onClick={() => authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                toast.success("Logged out successfully")
                                router.push("/")
                            },
                            onError: (error) => {
                                toast.error(error.error.message)
                            }
                        }
                    })}>
                        Logout
                    </Button>
                ) : (
                    <>
                        <Link className={buttonVariants({ variant: "default" })} href="/auth/sign-up">Sign-up</Link>
                        <Link className={buttonVariants({ variant: "secondary" })} href="/auth/login">Login</Link>
                    </>
                )}


                <ThemeToggle />
            </div>

        </nav>
    )
}