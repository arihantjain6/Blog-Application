import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up | BlogNest",
    description: "Create a free BlogNest account and start your writing journey today.",
    category: "Authentication",
    authors: [{ name: "BlogNest" }],
};

export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
