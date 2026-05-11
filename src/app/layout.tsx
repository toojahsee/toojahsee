import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jah See Too - Wikipedia",
  description: "Malaysia's First Chinese Hacker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-blue-200 selection:text-black dark:selection:bg-blue-900 dark:selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen mx-auto max-w-[1600px] bg-wiki-bg dark:bg-wiki-bgDark shadow-sm">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 pb-20 max-w-[1100px] w-full">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
