import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
      <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold">My own notes</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/createBlogPage" className="hover:underline" prefetch={false}>
            Create blog
          </Link>
          <Link href="/login" className="hover:underline" prefetch={false}>
            Login
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="md:hidden">
            <DialogTitle className="flex flex-row gap-2">
              <MountainIcon className="h-6 w-6" />
              <span className="text-lg font-bold">My own notes</span>
            </DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="grid gap-4 p-4">
              <nav className="grid gap-4">
                <Link href="/createBlogPage" className="flex items-center gap-2 text-lg font-medium hover:underline" prefetch={false}>
                  Create blog
                </Link>
                <Link href="/login" className="flex items-center gap-2 text-lg font-medium hover:underline" prefetch={false}>
                  Login
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </header>
        {children}
      </body>
    </html>
  );
}


function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
