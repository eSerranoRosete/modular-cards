"use client";

//write a hook to get the current path and return the active navigation item

import { usePathname } from "next/navigation";

export function useActiveNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return {
    isActive,
  };
}
