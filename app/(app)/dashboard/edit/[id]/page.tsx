import { getSingleCard } from "@/server/card/getSingleCard";

import { EditCardInner } from "./inner";

type EditCardProps = {
  params: {
    id: string;
  };
};

export default async function EditCard({ params }: EditCardProps) {
  const card = await getSingleCard({ cardID: params.id });

  if (!card) return <>No Card Found</>;

  return <EditCardInner card={card} />;
}
