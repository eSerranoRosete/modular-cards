import { Button } from "../ui/button";
import { DownloadIcon, Share2, UploadCloud } from "lucide-react";

import { UploadFileDialog } from "../dialogs/UploadFileDialog";
import { useCardStore } from "@/context/card/useCardStore";
import { SocialIcon } from "react-social-icons";

export const CardTemplate = () => {
  const { state, actions } = useCardStore();

  return (
    <>
      <div className="relative shrink-0 w-full  m-auto max-w-md overflow-hidden rounded-b-2xl rounded-t-2xl bg-white shadow-md">
        <div className="relative m-auto rounded-b-3xl max-w-md overflow-hidden bg-white shadow-xl">
          <div
            id="banner"
            className="relative group/cover z-10 flex h-72 w-full items-end bg-white shadow-lg justify-center rounded-b-3xl"
          >
            <img
              src={
                state.cover?.url ||
                state.cover?.base64Content ||
                "https://illustrations.popsy.co/amber/abstract-art-6.svg"
              }
              alt="Cover Image"
              className="absolute h-full w-full rounded-b-3xl object-cover object-center"
            />

            <div className="absolute right-2 bottom-2 hidden group-hover/cover:block">
              <UploadFileDialog
                onSuccess={(base64Content) =>
                  actions.setCover({ base64Content, name: "cover" })
                }
                trigger={
                  <Button size="icon" variant="outline">
                    <UploadCloud className="w-4" />
                  </Button>
                }
              />
            </div>

            <div className="h-32 w-32 relative group/avatar bg-white translate-y-1/2 overflow-hidden rounded-xl shadow-xl">
              <img
                src={
                  state.avatar?.url ||
                  state.avatar?.base64Content ||
                  "https://illustrations.popsy.co/amber/man-with-short-hair-avatar.svg"
                }
                alt="Profile Image"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute right-2 bottom-2 hidden group-hover/avatar:block">
                <UploadFileDialog
                  onSuccess={(base64Content) =>
                    actions.setAvatar({ base64Content, name: "avatar" })
                  }
                  trigger={
                    <Button size="icon" variant="outline">
                      <UploadCloud className="w-4" />
                    </Button>
                  }
                />
              </div>
            </div>
          </div>

          <div className="relative pt-20 text-center">
            <div className="m-auto mb-5 w-5/6 p-3 text-slate-800">
              <h4 className="text-2xl font-bold mb-2">{state.title}</h4>
              <p className="m-auto mb-2 max-w-xs text-sm">
                {state.description}
              </p>
              <div className="mb-4 flex items-center justify-center text-sm font-bold">
                {state.organization}
              </div>
              {state.settings?.showContactButton && (
                <a className="m-auto mb-2 gap-2 flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2 text-sm text-white">
                  Añadir a contactos
                  <DownloadIcon className="w-5" />
                </a>
              )}

              {state.settings?.showShareButton && (
                <a className="m-auto mb-2 gap-2 flex items-center justify-center rounded-xl bg-slate-200 px-6 py-2 text-sm text-slate-900">
                  Compartir Tarjeta
                  <Share2 className="w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="p-4 flex gap-3 flex-wrap items-center justify-center">
            {state.social.map((item) => (
              <div key={item.id}>
                <SocialIcon target="_blank" url={item.url} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
