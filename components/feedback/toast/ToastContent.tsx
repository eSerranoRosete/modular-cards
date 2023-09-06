import React from "react";

import { CheckCircle2 } from "lucide-react";
import { XCircle } from "lucide-react";

type Props = {
  children: React.ReactNode;
  variant: "success" | "error";
};

export const ToastContent = ({ children, variant }: Props) => {
  return (
    <div className="flex items-center">
      {variant === "success" && (
        <CheckCircle2 className="w-4 mr-2 text-green-500" />
      )}
      {variant === "error" && <XCircle className="w-4 mr-2 text-red-500" />}
      {children}
    </div>
  );
};
