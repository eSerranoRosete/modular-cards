import { Card } from "@/components/ui/card";
import { getUserCards } from "@/server/card/getUserCards";
import Link from "next/link";

export default async function DashboardPage() {
  const userCards = await getUserCards();

  const hasCards = userCards && userCards.length > 0;

  return (
    <Card className="mt-5 w-full h-72 rounded overflow-clip relative bg-secondary flex items-center justify-center">
      <img
        src="https://illustrations.popsy.co/gray/product-launch.svg"
        className="absolute w-1/3 rotate-45 -left-10"
      />

      {!hasCards && (
        <div className="text-center">
          <h1 className="mb-5 text-3xl font-bold max-w-md">
            You don't have any cards yet!
          </h1>
          <h2>
            Get started by{" "}
            <Link className="underline" href="/studio/create">
              creating your first card
            </Link>
          </h2>
        </div>
      )}

      <img
        src="https://illustrations.popsy.co/gray/business-success-chart.svg"
        className="absolute w-1/4 right-0"
      />
    </Card>
  );
}
