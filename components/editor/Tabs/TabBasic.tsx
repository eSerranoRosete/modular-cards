"use client";

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
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useContext } from "react";

import { CardContext } from "@/context/card/useCardStore";
import { useStore } from "zustand";

export const TabBasic = () => {
  const store = useContext(CardContext);

  if (!store) throw new Error("Missing CardContext.Provider in the tree");

  const ctx = useStore(store, (s) => ({ ...s }));

  const formSchema = z.object({
    title: z.string().trim().min(1).nonempty(),
    description: z.string().optional(),
    organization: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ctx.title || "",
      description: ctx.description || "",
      organization: ctx.organization || "",
    },
  });

  form.watch((values) => {
    if (values.title) ctx.setTitle(values.title);
    if (values.description) ctx.setDescription(values.description);
    if (values.organization) ctx.setOrganization(values.organization);
  });

  return (
    <div>
      <div>
        <h5 className="text-xl font-semibold">Basic Details</h5>
        <p className="text-sm mb-5 text-muted-foreground">
          Fill in the basic details for your card
        </p>
      </div>
      <Form {...form}>
        <form className="w-full max-w-md grid gap-3">
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
        </form>
      </Form>
    </div>
  );
};
