"use client";

import { useCurrentPath } from "@/hooks/useCurrentPath";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

function cleanPath(path: string, href: string) {
  const hrefParts = href.split("/");
  const pathParts = path.split("/");

  if (hrefParts.length !== pathParts.length) return path;

  return hrefParts
    .map((part, i) => {
      if (part.startsWith(":")) {
        return part;
      }
      return pathParts[i];
    })
    .join("/");
}

export function NavBarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const currentPath = useCurrentPath();
  const isActive = useMemo(
    () => cleanPath(currentPath, href) === href,
    [currentPath, href],
  );

  return (
    <Link
      href={href}
      className={cn({ "text-primary": isActive, "text-gray-500": !isActive })}
    >
      {children}
    </Link>
  );
}
