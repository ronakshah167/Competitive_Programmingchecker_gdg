import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { CookieBanner } from "@/components/shared/cookie-banner";
import "./globals.css";
import { cn } from "@/lib/utils";
import { FirebaseClientProvider } from "@/firebase";

export const metadata: Metadata = {
  title: "ALL IN - AI Code Evaluator & Mentorship",
  description:
    "Go all in on your code with AI-powered code analysis, mentorship chatbot, and competitive programming tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  if (storedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (storedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body text-foreground antialiased selection:bg-primary selection:text-primary-foreground",
        )}
      >
        <FirebaseClientProvider>
          <div className="relative flex min-h-screen flex-col">
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </div>
          <ScrollToTop />
          <CookieBanner />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
