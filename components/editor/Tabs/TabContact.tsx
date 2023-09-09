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
import { useForm } from "react-hook-form";

import { useCardStore } from "@/context/card/useCardStore";
import { Switch } from "@/components/ui/switch";

export const TabContact = () => {
  const { state, actions } = useCardStore();

  const form = useForm({
    defaultValues: {
      email: state.email,
      phone: state.phone,
      showContactButton: state.settings?.showContactButton,
      showShareButton: state.settings?.showShareButton,
    },
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
        <form className="w-full grid gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    onChangeCapture={(e) =>
                      actions.setEmail(e.currentTarget.value)
                    }
                    type="email"
                    {...field}
                  />
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
                  <Input
                    type="tel"
                    onChangeCapture={(e) =>
                      actions.setPhone(e.currentTarget.value)
                    }
                    {...field}
                  />
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
                    Show or hide the contact button on your card.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    disabled={!state.email && !state.phone}
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value);
                      actions.setSettings({ showContactButton: value });
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="showShareButton"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Share Button</FormLabel>
                  <FormDescription>
                    Show or hide the share button on your card.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value);
                      actions.setSettings({ showShareButton: value });
                    }}
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
