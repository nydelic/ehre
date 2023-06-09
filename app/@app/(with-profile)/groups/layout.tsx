import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <main className="relative">
      <h1 className="text-2xl font-bold mb-4 mx-auto max-w-md pt-6 px-4 flex justify-between">
        <span>Groups</span>
        <Link
          href="/new/group"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Create group
        </Link>
      </h1>
      {children}
    </main>
  );
}

export default Layout;
