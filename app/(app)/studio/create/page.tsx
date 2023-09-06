"use client";

import { CardEditor } from "@/components/editor/CardEditor";
import { CardProvider } from "@/context/card/CardProvider";

export default function StudioCreatePage() {
  return (
    <CardProvider>
      <CardEditor />
    </CardProvider>
  );
}
