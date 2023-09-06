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
import { useCardContext } from "@/context/card/useCardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Cards } from "@/xata";
import { updateCard } from "@/server/card/updateCard";

import { DeleteCardDialog } from "@/components/dialogs/DeleteCardDialog";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/ui/app-button";

type StudioEditCardInnerProps = {
  card: Cards;
};

export const StudioEditCardInner = ({ card }: StudioEditCardInnerProps) => {
  const ctx = useCardContext((state) => ({ ...state }));

  const [fileUploaded, setFileUploaded] = useState(false);

  const { toast } = useToast();

  const formSchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    description: z.string().optional(),
    organization: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: card.title!,
      description: card.description!,
      organization: card.organization!,
    },
  });

  form.watch((values) => {
    if (values.title) ctx.setTitle(values.title);
    if (values.description) ctx.setDescription(values.description);
    if (values.organization) ctx.setOrganization(values.organization);
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCard({
        ...values,
        id: card.id,
        base64Avatar: ctx.avatar,
        base64Cover: ctx.cover,
      });
      toast({
        title: "Card Updated",
        description: "The card has been updated successfully.",
        variant: "default",
      });
      setFileUploaded(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An error occurred while updating your card.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    ctx.reset();
    if (card.title) ctx.setTitle(card.title);
    if (card.description) ctx.setDescription(card.description);
    if (card.organization) ctx.setOrganization(card.organization);
    if (card.avatar) ctx.setAvatar(card.avatar.url);
    if (card.cover) ctx.setCover(card.cover.url);
  }, []);

  return (
    <main>
      <div className="flex mt-5 space-x-2 items-center">
        <div className="grow flex space-x-2 items-baseline">
          <Link href="/studio">
            <h1 className="text-3xl font-medium underline">Studio</h1>
          </Link>
          <h5 className="text-muted-foreground">/ Edit</h5>
        </div>
        <DeleteCardDialog cardID={card.id} />
        <Link
          href={`/card/${card.id}`}
          target="_blank"
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "gap-2"
          )}
        >
          <ExternalLink className="w-4" />
          View Card
        </Link>
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
                disabled={
                  form.formState.isSubmitting ||
                  (!form.formState.isDirty && !fileUploaded)
                }
                isLoading={form.formState.isSubmitting}
                iconStart={<Save className="w-4" />}
              >
                Save
              </AppButton>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
};