"use client";

import { buttonVariants } from "@/components/ui/button";
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
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
import { createCard } from "@/server/card/createCard";
import { Save } from "lucide-react";
import { useContext } from "react";

import { AppButton } from "@/components/ui/app-button";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { CardContext } from "@/context/card/useCardStore";
import { CardTemplate } from "./CardTemplate";

export const CreateCardViewer = () => {
  const store = useContext(CardContext);

  if (!store) throw new Error("Missing CardContext.Provider in the tree");

  const ctx = useStore(store, (s) => ({ ...s }));

  const router = useRouter();

  const { toast } = useToast();

  const formSchema = z.object({
    title: z.string().trim().min(1).nonempty(),
    description: z.string().optional(),
    organization: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  form.watch((values) => {
    if (values.title) ctx.setTitle(values.title);
    if (values.description) ctx.setDescription(values.description);
    if (values.organization) ctx.setOrganization(values.organization);
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(ctx.avatar, ctx.cover);

    try {
      await createCard({
        ...values,
        base64Avatar: ctx.avatar,
        base64Cover: ctx.cover,
      });

      router.push("/studio");

      toast({
        title: "Card Created",
        description: "Your card has been created successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating your card.",
        variant: "destructive",
      });
    }
  };

  return (
    <main>
      <div className="flex mt-5 items-center">
        <div className="grow flex space-x-2 items-baseline">
          <Link href="/studio">
            <h1 className="text-3xl font-medium underline">Studio</h1>
          </Link>
          <h5 className="text-muted-foreground">/create</h5>
        </div>
      </div>
      <section className="mt-10 flex items-start">
        <Form {...form}>
          <form
            className="w-full max-w-md grid gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <h5 className="text-xl font-semibold">Basic Details</h5>
              <p className="text-sm mb-5 text-muted-foreground">
                Fill in the basic details for your card
              </p>
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Subtitle</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-5 flex space-x-2 justify-end">
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/studio"
              >
                Cancel
              </Link>
              <AppButton
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
                iconStart={<Save className="w-4" />}
              >
                Save
              </AppButton>
            </div>
          </form>
        </Form>
        <CardTemplate />
      </section>
    </main>
  );
};
