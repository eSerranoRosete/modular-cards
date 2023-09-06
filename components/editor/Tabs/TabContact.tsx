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

import { useToast } from "@/components/ui/use-toast";

import { cardStoreActions, cardStoreState } from "@/context/card/useCardStore";

export const TabContact = () => {
  const state = cardStoreState();
  const actions = cardStoreActions();

  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: state.email || "",
      phone: state.phone || "",
    },
  });

  form.watch((values) => {
    if (values.email) actions.setEmail(values.email);
    if (values.phone) actions.setPhone(values.phone);
  });

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
        </form>
      </Form>
    </div>
  );
};
