import { getSingleCard } from "@/server/card/getSingleCard";
import { notFound } from "next/navigation";

type CardPage = {
  params: {
    id: string;
  };
};

export default async function CardPage({ params }: CardPage) {
  const card = await getSingleCard({ cardID: params.id });

  if (!card) return notFound();

  return (
    <div className="relative shrink-0 w-full  m-auto max-w-md overflow-hidden rounded-b-2xl rounded-t-2xl bg-white shadow-md">
      <div
        id="cover"
        className="group/cover relative flex h-72 w-full items-end justify-center rounded-b-2xl rounded-t-2xl bg-white shadow-md"
      >
        <img
          src={card.cover?.url}
          alt="Cover Image"
          className="h-full w-full rounded-b-2xl rounded-t-2xl object-cover object-center"
        />
      </div>
      <div className="group/avatar relative">
        <div className="relative m-auto h-32 w-32 -translate-y-1/2 overflow-hidden rounded-xl">
          <img
            src={card.avatar?.url}
            alt="Profile Image"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
      <div className="group/details relative h-full -translate-y-1/2 text-center">
        <div className="relative m-auto mb-5 w-5/6 p-3 text-slate-800">
          <h4 className="mb-2 text-2xl font-bold">{card.title}</h4>
          <p className="m-auto mb-2 max-w-xs text-sm">{card.description}</p>
          <div className="mb-4 flex items-center justify-center text-sm font-bold">
            <span>{card.organization}</span>
          </div>
          <div className="absolute right-0 top-0 hidden group-hover/details:block"></div>
        </div>
      </div>
    </div>
  );
}
