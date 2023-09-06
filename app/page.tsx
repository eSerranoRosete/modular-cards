import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="container p-4 flex items-center justify-between">
      <h1 className="font-bold">Inteminer</h1>
      <div className="space-x-5">
        <Link href="/sign-up">
          <Button variant="secondary" size="sm">
            Create Account
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button size="sm">Sign In</Button>
        </Link>
      </div>
    </div>
  );
}
