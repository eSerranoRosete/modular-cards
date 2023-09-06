"use client";

import { cardStoreActions, cardStoreState } from "@/context/card/useCardStore";
import { EditorTab, useEditorStore } from "@/context/card/useEditorStore";
import { cn } from "@/lib/utils";
import { createCard } from "@/server/card/createCard";
import { updateCard } from "@/server/card/updateCard";
import {
  AtSign,
  ChevronLeft,
  Cog,
  Contact,
  ExternalLink,
  LayoutPanelLeft,
  List,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardTemplate } from "../card/CardTemplate";
import { AppButton } from "../ui/app-button";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "../ui/use-toast";
import { TabBasic } from "./Tabs/TabBasic";
import { TabContact } from "./Tabs/TabContact";
import { TabModules } from "./Tabs/TabModules";
import { TabSettings } from "./Tabs/TabSettings";
import { TabSocial } from "./Tabs/TabSocial";
import { useRouter } from "next/navigation";

type ToolbarItem = {
  tab: EditorTab;
  icon: JSX.Element;
};

const toolbarItems: ToolbarItem[] = [
  {
    tab: "basic",
    icon: <List />,
  },
  {
    tab: "contact",
    icon: <Contact />,
  },
  {
    tab: "modules",
    icon: <LayoutPanelLeft />,
  },
  {
    tab: "social",
    icon: <AtSign />,
  },
  {
    tab: "settings",
    icon: <Cog />,
  },
];

export const CardEditor = () => {
  const state = cardStoreState();

  const router = useRouter();

  const [pending, setPending] = useState(false);

  const store = useEditorStore((s) => ({ ...s }));

  useEffect(() => {
    store.setActiveTab("basic");
  }, []);

  const onSave = async () => {
    try {
      if (state.id) {
        await updateCard({
          ...state,
          id: state.id,
          base64Avatar: state.avatar,
          base64Cover: state.cover,
        });
      } else {
        let stateCopy = { ...state };

        delete stateCopy.id;

        const id = await createCard({
          ...stateCopy,
          base64Avatar: state.avatar,
          base64Cover: state.cover,
        });

        router.push(`/studio/edit/${id}`);
      }

      toast({
        title: "Success!",
        description: "Changes to your card have been saved.",
        variant: "default",
      });

      setPending(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An error occurred while saving your card.",
        variant: "destructive",
      });

      setPending(false);
    }
  };

  return (
    <div>
      <div className="flex mt-5 space-x-2 items-center">
        <div className="grow flex space-x-2 items-baseline">
          <Link href="/studio">
            <h1 className="text-2xl flex items-baseline gap-2 font-medium underline">
              <ChevronLeft className="self-center" />
              <span>Studio</span>
            </h1>
          </Link>
          <h5 className="text-muted-foreground">/ Editor</h5>
        </div>
        {state.id && (
          <Link
            href={`/card/${state.id}`}
            target="_blank"
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "gap-2"
            )}
          >
            <ExternalLink className="w-4" />
            View Card
          </Link>
        )}
      </div>
      <section className="grid mt-10 gap-8 grid-cols-2 w-full">
        <div className="h-full flex gap-5">
          <div className="p-2 pr-4 w-fit rounded-md rouned-md grid content-start gap-4 border-r border-border h-full">
            {toolbarItems.map((item) => (
              <Button
                key={item.tab}
                size="icon"
                variant={store.activeTab === item.tab ? "default" : "secondary"}
                onClick={() => store.setActiveTab(item.tab)}
              >
                {item.icon}
              </Button>
            ))}
          </div>
          <div className="w-full h-full relative">
            {store.activeTab === "basic" && <TabBasic />}
            {store.activeTab === "contact" && <TabContact />}
            {store.activeTab === "modules" && <TabModules />}
            {store.activeTab === "settings" && (
              <TabSettings cardID={state.id} />
            )}
            {store.activeTab === "social" && <TabSocial />}
            <AppButton
              className="float-right mt-4 absolute bottom-2 right-2"
              size="sm"
              disabled={pending}
              isLoading={pending}
              iconStart={<Save className="w-4" />}
              onClick={() => {
                setPending(true);
                onSave();
              }}
            >
              Save Changes
            </AppButton>
          </div>
        </div>
        <div className="h-full p-10 bg-muted/50">
          <CardTemplate />
        </div>
      </section>
    </div>
  );
};
