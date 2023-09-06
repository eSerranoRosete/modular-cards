import { ToastProps } from "@/components/ui/toast";
import { CheckCircle, XCircle } from "lucide-react";

type GetToastProps = {
  title?: ToastProps["title"];
  description?: string;
  variant?: ToastProps["variant"];
};

export function getToast({ title, description, variant }: GetToastProps) {
  switch (variant) {
    case "destructive":
      return {
        title: (
          <div className="grid-2">
            <XCircle className="w-4 text-destructive-foreground" />
            {title || "Error"}
          </div>
        ),
        description: description || "An error occurred",
        variant: "destructive",
      };
    default:
      return {
        title: (
          <div className="grid-2">
            <CheckCircle className="w-4 text-primary" />
            {title || "Success"}
          </div>
        ),
        description: description || "Operation completed successfully",
        variant: "default",
      };
  }
}
