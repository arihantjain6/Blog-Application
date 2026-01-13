import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | BlogNest",
    description: "Login to your BlogNest account to continue sharing your ideas.",
    category: "Authentication",
    authors: [{ name: "BlogNest" }],
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
