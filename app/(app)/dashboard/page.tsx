import { NoCardsBanner } from "@/components/feedback/NoCardsBanner";
import { getUserCards } from "@/server/card/getUserCards";

export default async function DashboardPage() {
  const userCard = await getUserCards();

  const hasCard = userCard && userCard.length > 0;

  return (
    <>
      <div className="flex mt-5 items-center">
        <div className="grow flex space-x-2 items-baseline">
          <h1 className="text-2xl flex gap-2 font-medium">
            <span>Dashboard</span>
          </h1>
        </div>
      </div>
      <div className="mt-10">{!hasCard && <NoCardsBanner />}</div>
    </>
  );
}
