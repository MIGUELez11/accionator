"use client";

import { useCurrentPath } from "@/hooks/useCurrentPath";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavBarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const currentPath = useCurrentPath();
  const isActive = currentPath === href;

  console.log(currentPath, href, isActive);

  return (
    <Link href={href} className={cn({"text-primary": isActive, "text-gray-500": !isActive})}>
      {children}
    </Link>
  );
}
