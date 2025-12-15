import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
    return (
        <nav className="flex justify-between w-full py-5">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold   ">
                        Next<span className="text-blue-500">Pro</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost" })} href="/">Home</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/blog">Blog</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/create">Create</Link>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Link className={buttonVariants({ variant: "default" } )} href="/auth/sign-up">Sign-up</Link>
                <Link className={buttonVariants({ variant: "secondary" })} href="/auth/login">Login</Link>
            <ThemeToggle/>
            </div>

        </nav>
    )
}