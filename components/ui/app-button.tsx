import React from "react";
import { Button, ButtonProps } from "./button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
  iconStart?: React.ReactNode;
}

export const AppButton = ({
  isLoading,
  children,
  iconStart,
  className,
  ...buttonProps
}: AppButtonProps) => {
  return (
    <Button {...buttonProps} className={cn(className, "gap-2")}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : iconStart}
      {children}
    </Button>
  );
};
