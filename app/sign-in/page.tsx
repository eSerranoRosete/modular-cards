"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { buttonVariants } from "@/components/ui/button";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SignIn() {
  const [error, setError] = useState<string>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const formSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await signIn("credentials", {
      username: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      return setError("Invalid email or password.");
    }

    router.push(callbackUrl);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="max-w-sm w-full">
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormMessage className="text-center">{error}</FormMessage>

              <Button
                className="mt-5"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </form>
          </Form>

          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-xs text-center m-auto block mt-2"
            )}
          >
            Don't have an account? Create one
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
