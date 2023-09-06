"use client";

import { CardFormViewer } from "@/components/card/CardFormViewer";
import { CardProvider } from "@/context/card/CardProvider";

export default function StudioCreatePage() {
  return (
    <CardProvider>
      <CardFormViewer />
    </CardProvider>
  );
}
