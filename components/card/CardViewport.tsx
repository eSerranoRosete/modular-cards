import React from "react";

type Props = {
  children: React.ReactNode;
};

export const CardViewport = ({ children }: Props) => {
  return (
    <div className="h-full rounded-xl shadow-sm p-10 bg-muted/50">
      {children}
    </div>
  );
};
