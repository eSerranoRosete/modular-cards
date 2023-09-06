import { CardEditor } from "@/components/editor/CardEditor";
import { CardProvider } from "@/context/card/CardProvider";

export default function EditorPage() {
  return (
    <CardProvider>
      <CardEditor />
    </CardProvider>
  );
}
