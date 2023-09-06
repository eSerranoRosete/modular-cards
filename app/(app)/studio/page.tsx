import { NoCardsBanner } from "@/components/feedback/NoCardsBanner";
import { AppButton } from "@/components/ui/app-button";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserCards } from "@/server/card/getUserCards";

import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function StudioPage() {
  const userCards = await getUserCards();

  const hasCard = userCards && userCards.length > 0;

  return (
    <main>
      <div className="flex mt-5 items-center">
        <div className="grow flex space-x-2 items-baseline">
          <Link href="/studio">
            <h1 className="text-2xl flex gap-2 font-medium">
              <span>Studio</span>
            </h1>
          </Link>
        </div>
        <Link href="/studio/create">
          <AppButton size="sm" iconStart={<PlusCircle className="w-4" />}>
            Create Card
          </AppButton>
        </Link>
      </div>
      <section className="mt-10 ">
        {!hasCard && <NoCardsBanner />}
        <div className="grid gap-4 grid-cols-4">
          {userCards?.map((card: any) => (
            <Link href={`/studio/edit/${card.id}`} className="group/card">
              <Card className="overflow-clip w-full h-full">
                <div className="w-full h-32 bg-black relative">
                  <img
                    src={card.cover?.url}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardHeader className="relative">
                  <CardTitle className="truncate">{card.title}</CardTitle>
                  <CardDescription className="truncate">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
