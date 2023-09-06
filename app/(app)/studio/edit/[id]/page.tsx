import { getSingleCard } from "@/server/card/getSingleCard";
import { StudioEditCardInner } from "./inner";

type StudioEditCardProps = {
  params: {
    id: string;
  };
};

export default async function StudioEditCard({ params }: StudioEditCardProps) {
  const card = await getSingleCard({ cardID: params.id });

  if (!card) return <>No Card Found</>;

  return (
    <StudioEditCardInner
      card={{
        id: card.id,
        description: card.description,
        organization: card.organization,
        title: card.title,
        avatar: card.avatar,
        cover: card.cover,
      }}
    />
  );
}
