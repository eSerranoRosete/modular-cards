"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

export const SignOut = () => {
  return (
    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
      <LogOut className="w-4 mr-2" />
      Sign out
    </DropdownMenuItem>
  );
};
