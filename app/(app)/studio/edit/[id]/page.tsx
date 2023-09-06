import { getSingleCard } from "@/server/card/getSingleCard";
import { StudioEditCardInner } from "./inner";
import { CardsRecord } from "@/xata";

type StudioEditCardProps = {
  params: {
    id: string;
  };
};

export default async function StudioEditCard({ params }: StudioEditCardProps) {
  const card = await getSingleCard({ cardID: params.id });

  if (!card) return <>No Card Found</>;

  return <StudioEditCardInner card={card as CardsRecord} />;
}
