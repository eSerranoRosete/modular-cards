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
import Link from "next/link";

import { Save } from "lucide-react";

import { AppButton } from "@/components/ui/app-button";

interface BasicDetailsFormProps {
  form: any;
  onSubmit: any;
}

export const BasicDetailsForm = ({ form, onSubmit }: BasicDetailsFormProps) => {
  return (
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
          <Link className={buttonVariants({ variant: "ghost" })} href="/studio">
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
  );
};
