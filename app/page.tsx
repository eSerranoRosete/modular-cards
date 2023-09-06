import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="container p-4 flex items-center justify-between">
      <h1 className="font-bold">Inteminer</h1>
      <div className="space-x-5">
        {!session ? (
          <>
            <Link
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                })
              )}
              href="/sign-up"
            >
              Create Account
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                })
              )}
              href="/sign-in"
            >
              Sign In
            </Link>
          </>
        ) : (
          <Link
            className={cn(
              buttonVariants({
                variant: "default",
                size: "sm",
              })
            )}
            href="/dashboard"
          >
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
