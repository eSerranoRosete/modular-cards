"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User, Wallet } from "lucide-react";
import { SignOut } from "../SignOut";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

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
            <div className="w-5 h-5 bg-black rounded-full" />
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
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>ES</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 mr-2" />
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Wallet className="w-4 mr-2" />
                Manage Subscription
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <SignOut />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
        isActive && "bg-black text-white hover:bg-black hover:text-white",
        "transition-none"
      )}
    >
      {label}
    </Link>
  );
};
