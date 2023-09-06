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
import { BasicDetailsForm } from "./BasicDetailsForm";

export const CardFormViewer = () => {
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
        <BasicDetailsForm form={form} onSubmit={onSubmit} />
        <CardTemplate />
      </section>
    </main>
  );
};
