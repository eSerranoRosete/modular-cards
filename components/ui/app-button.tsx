import React from "react";
import { Button, ButtonProps } from "./button";
import { Loader2 } from "lucide-react";

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
  iconStart?: React.ReactNode;
}

export const AppButton = ({
  isLoading,
  children,
  iconStart,
  ...buttonProps
}: AppButtonProps) => {
  return (
    <Button {...buttonProps} className="gap-2">
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : iconStart}
      {children}
    </Button>
  );
};
