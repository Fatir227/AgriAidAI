"use client"
import { Leaf } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
      <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <h1 className="font-headline text-2xl font-bold text-foreground">AgriAid AI</h1>
      </Link>
    </header>
  );
}
