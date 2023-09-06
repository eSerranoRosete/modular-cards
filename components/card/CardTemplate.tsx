import { Button } from "../ui/button";
import { UploadCloud } from "lucide-react";

import { UploadFileDialog } from "../dialogs/UploadFileDialog";
import { useContext } from "react";
import { CardContext } from "@/context/card/useCardStore";
import { useStore } from "zustand";

type CardTemplateProps = {
  onFileUpload?: (url?: string) => void;
};

export const CardTemplate = ({ onFileUpload }: CardTemplateProps) => {
  const store = useContext(CardContext);

  if (!store) throw new Error("Missing BearContext.Provider in the tree");

  const ctx = useStore(store, (s) => ({ ...s }));

  return (
    <>
      <div className="relative shrink-0 w-full  m-auto max-w-md overflow-hidden rounded-b-2xl rounded-t-2xl bg-white shadow-md">
        <div
          id="cover"
          className="group/cover relative flex h-72 w-full items-end justify-center rounded-b-2xl rounded-t-2xl bg-white shadow-md"
        >
          <div className="absolute right-2 bottom-2 hidden group-hover/cover:block">
            <UploadFileDialog
              onSuccess={(url) => {
                ctx.setCover(url);
                if (onFileUpload) onFileUpload(url);
              }}
              trigger={
                <Button size="icon" variant="outline">
                  <UploadCloud className="w-4" />
                </Button>
              }
            />
          </div>
          <img
            src={
              ctx.cover ||
              "https://firebasestorage.googleapis.com/v0/b/inteminer-26db4.appspot.com/o/static%2Fbanner.jpeg?alt=media&token=1f47db97-0648-4219-a196-1eb4a4d2f1d9"
            }
            alt="Cover Image"
            className="h-full w-full rounded-b-2xl rounded-t-2xl object-cover object-center"
          />
        </div>
        <div className="group/avatar relative">
          <div className="relative m-auto h-32 w-32 -translate-y-1/2 overflow-hidden rounded-xl">
            <img
              src={
                ctx.avatar ||
                "https://firebasestorage.googleapis.com/v0/b/inteminer-26db4.appspot.com/o/static%2Favatar.jpeg?alt=media&token=da068e14-18b6-4a5b-a300-5fa12e7c4b28"
              }
              alt="Profile Image"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute right-2 bottom-2 hidden group-hover/avatar:block">
              <UploadFileDialog
                onSuccess={(url) => {
                  ctx.setAvatar(url);
                  if (onFileUpload) onFileUpload(url);
                }}
                trigger={
                  <Button size="icon" variant="outline">
                    <UploadCloud className="w-4" />
                  </Button>
                }
              />
            </div>
          </div>
        </div>
        <div className="group/details relative h-full -translate-y-1/2 text-center">
          <div className="relative m-auto mb-5 w-5/6 p-3 text-slate-800">
            <h4 className="mb-2 text-2xl font-bold">{ctx.title}</h4>
            <p className="m-auto mb-2 max-w-xs text-sm">{ctx.description}</p>
            <div className="mb-4 flex items-center justify-center text-sm font-bold">
              <span>{ctx.organization}</span>
            </div>
            <div className="absolute right-0 top-0 hidden group-hover/details:block"></div>
          </div>
        </div>
      </div>
    </>
  );
};
