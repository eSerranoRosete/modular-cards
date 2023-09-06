"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cardStoreActions, cardStoreState } from "@/context/card/useCardStore";
import { Switch } from "@/components/ui/switch";
import { useMemo } from "react";

export const TabContact = () => {
  const state = cardStoreState();
  const actions = cardStoreActions();

  const formSchema = z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    showContactButton: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: state.email as string,
      phone: state.phone as string,
      showContactButton: state.settings?.showContactButton,
    },
  });

  useMemo(() => {
    form.watch((v) => {
      if (v.email) actions.setEmail(v.email);
      if (v.phone) actions.setPhone(v.phone);

      actions.setShowContactButton(v.showContactButton);
    });
  }, []);

  return (
    <div>
      <div>
        <h5 className="text-xl font-semibold">Contact Details</h5>
        <p className="text-sm mb-5 text-muted-foreground">
          Fill in the contact details for your card
        </p>
      </div>
      <Form {...form}>
        <form className="w-full max-w-md grid gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="showContactButton"
            render={({ field }) => (
              <FormItem className="flex mt-10 flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Contact Button</FormLabel>
                  <FormDescription>
                    Receive emails about new products, features, and more.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    disabled={!state.email && !state.phone}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
