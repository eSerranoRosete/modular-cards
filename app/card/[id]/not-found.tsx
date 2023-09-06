import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img
          src="https://illustrations.popsy.co/gray/crashed-error.svg"
          alt="Not found image"
          className="w-72 m-auto"
        />
        <h1 className="text-3xl font-semibold">We couldn't find the card</h1>
        <Link href="/" className={cn(buttonVariants({ variant: "link" }))}>
          Go back to the homepage
        </Link>
      </div>
    </main>
  );
}
