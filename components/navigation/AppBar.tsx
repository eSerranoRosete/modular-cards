"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { ProfileMenu } from "../ProfileMenu";
import { SessionProvider } from "next-auth/react";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Studio",
    path: "/studio",
  },
];

export const AppBar = () => {
  const pathname = usePathname();

  return (
    <div>
      <nav className="container py-2 flex items-center">
        <Link href="/dashboard">
          <h1 className="flex items-center space-x-2">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="text-foreground w-6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.857422 26.3135C0.0761719 27.0947 0.0761719 28.3604 0.857422 29.1416C1.63867 29.9229 2.90527 29.9229 3.68555 29.1416L8.0459 24.7812C10.0078 26.1787 12.4082 27 15 27C21.627 27 27 21.627 27 15C27 12.4082 26.1787 10.0078 24.7812 8.0459L29.1416 3.68555C29.9229 2.90527 29.9229 1.63867 29.1416 0.857422C28.3604 0.0761719 27.0947 0.0761719 26.3135 0.857422L21.9521 5.21875C19.9902 3.82227 17.5918 3 15 3C8.37305 3 3 8.37305 3 15C3 17.5918 3.82227 19.9902 5.21875 21.9521L0.857422 26.3135Z"
                fill="currentColor"
              />
            </svg>

            <span className="font-semibold">Inteminer</span>
          </h1>
        </Link>
        <div className="flex ml-20 space-x-2 items-center grow">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              label={item.label}
              path={item.path}
              isActive={pathname.startsWith(item.path)}
            />
          ))}
        </div>

        <SessionProvider>
          <ProfileMenu />
        </SessionProvider>
      </nav>
      <Separator />
    </div>
  );
};

type NavItemProps = {
  isActive?: boolean;
  label: string;
  path: string;
};

export const NavItem = ({ isActive, label, path }: NavItemProps) => {
  return (
    <Link
      href={path}
      className={cn(
        buttonVariants({
          size: "sm",
          variant: "ghost",
        }),
        isActive && "bg-primary text-white hover:bg-primary hover:text-white",
        "transition-none"
      )}
    >
      {label}
    </Link>
  );
};
