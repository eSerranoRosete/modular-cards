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
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialItem } from "@/server/card/CardTypes";
import { UUID } from "@/lib/UUID";
import { Card, CardContent } from "@/components/ui/card";

import { SocialIcon } from "react-social-icons";

export const TabSocial = () => {
  const { state, actions } = useCardStore();

  const formSchema = z.object({
    url: z.string().url(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values.url);

    const currenSocial = state.social;

    const socialItem: SocialItem = {
      id: UUID(),
      url: values.url,
    };

    const newSocial = [...currenSocial, socialItem];

    actions.setSocial(newSocial);

    form.reset();
  };

  return (
    <div className="max-w-md">
      <div>
        <h5 className="text-xl font-semibold">Social Links</h5>
        <p className="text-sm mb-5 text-muted-foreground">
          Add social links to your card
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex items-end gap-3"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Link:</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <Button size="icon" className="shrink-0">
                    <PlusCircle className="w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="mt-5 w-full space-y-2">
        {state.social.map((item) => (
          <Card
            className="p-2 flex items-center gap-3 w-full hover:bg-muted cursor-pointer"
            key={item.id}
          >
            <SocialIcon
              defaultSVG={{
                color: "#fff",
                path: "M 0,0 20,0 20,20 0,20 z",
              }}
              className="!w-8 !h-8 shrink-0"
              as="div"
              url={item.url}
            />
            <div key={item.id} className="text-muted-foreground truncate">
              {item.url}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export function getHostFromUrl(url: string) {
  const { host } = new URL(url);
  return host;
}
