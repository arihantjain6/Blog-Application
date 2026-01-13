import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Authentication | BlogNest",
    description: "Sign in or create an account to start sharing your ideas on BlogNest.",
    category: "Authentication",
    authors: [{ name: "BlogNest" }],
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute top-5 left-5">
                <Link href="/" className={buttonVariants({ variant: "secondary" })}>
                    <ArrowLeft className="size-4" />
                    Go Back
                </Link>
            </div>
            <div className="w-full max-w-md mx-auto">
                {children}
            </div>
        </div>
    )
}

