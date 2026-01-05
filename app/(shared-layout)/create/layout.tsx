import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Blog | Next.js",
    description: "Create a new blog post",
    category: "Blog",
    authors: [{ name: "test-2" }]
};

export default function CreateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
