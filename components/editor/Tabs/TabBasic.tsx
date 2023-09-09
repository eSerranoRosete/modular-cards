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
import { useForm } from "react-hook-form";

import { useCardStore } from "@/context/card/useCardStore";

export const TabBasic = () => {
  const { state, actions } = useCardStore();

  const form = useForm({
    defaultValues: {
      title: state.title,
      description: state.description,
      organization: state.organization,
    },
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
        <form className="w-full grid gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Title</FormLabel>
                <FormControl>
                  <Input
                    onChangeCapture={(e) =>
                      actions.setTitle(e.currentTarget.value)
                    }
                    {...field}
                  />
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
                  <Input
                    onChangeCapture={(e) =>
                      actions.setDescription(e.currentTarget.value)
                    }
                    {...field}
                  />
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
                  <Input
                    onChangeCapture={(e) =>
                      actions.setOrganization(e.currentTarget.value)
                    }
                    {...field}
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
