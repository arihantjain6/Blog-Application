import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/web/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BlogNest - Share Your Ideas With the World",
    template: "%s | BlogNest",
  },
  description: "Create beautiful blog posts, connect with readers, and build your audience. Start your writing journey today.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  authors: [{ name: "BlogNest" }],
  creator: "BlogNest",
  publisher: "BlogNest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > <main className="max-w  -7xl mx-auto w-full px-4 md:px-6 lg:px-8">

            <ConvexClientProvider>{children}</ConvexClientProvider>
          </main>
          <Toaster closeButton />
        </ThemeProvider>

      </body>
    </html>
  );
}
