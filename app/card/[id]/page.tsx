import { getSingleCard } from "@/server/card/getSingleCard";
import { DownloadIcon } from "lucide-react";
import { notFound } from "next/navigation";

type CardPage = {
  params: {
    id: string;
  };
};

export default async function CardPage({ params }: CardPage) {
  const card = await getSingleCard({ cardID: params.id });

  if (!card) return notFound();

  return (
    <div className="relative shrink-0 w-full  m-auto max-w-md overflow-hidden rounded-b-2xl rounded-t-2xl bg-white shadow-md">
      <div className="relative m-auto rounded-b-3xl max-w-md overflow-hidden bg-white shadow-xl">
        <div
          id="banner"
          className="relative group/cover z-10 flex h-72 w-full items-end bg-white shadow-lg justify-center rounded-b-3xl"
        >
          <img
            src={card.cover?.url}
            alt="Cover Image"
            className="absolute h-full w-full rounded-b-3xl object-cover object-center"
          />

          <div className="h-32 w-32 relative group/avatar bg-white translate-y-1/2 overflow-hidden rounded-xl shadow-xl">
            <img
              src={card.avatar?.url}
              alt="Profile Image"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="relative pt-20 text-center">
          <div className="m-auto mb-5 w-5/6 p-3 text-slate-800">
            <h4 className="text-2xl font-bold mb-2">{card.title as string}</h4>
            <p className="m-auto mb-2 max-w-xs text-sm">
              {card.description as string}
            </p>
            <div className="mb-4 flex items-center justify-center text-sm font-bold">
              {card.organization as string}
            </div>
            {card.settings?.showContactButton && (
              <a
                href="data:text/vcard;charset=UTF-8,BEGIN%3AVCARD%0D%0AVERSION%3A3.0%0D%0AFN%3BCHARSET%3DUTF-8%3AAlejandra%20Rosete%20Rdz.%0D%0AN%3BCHARSET%3DUTF-8%3ARosete%20Rdz.%3BAlejandra%3B%3B%3B%0D%0AEMAIL%3BCHARSET%3DUTF-8%3Btype%3DHOME%2CINTERNET%3Aarosete.ciudadmaderas%40gmail.com%0D%0ATEL%3BTYPE%3DWORK%2CVOICE%3A5547828310%0D%0ATITLE%3BCHARSET%3DUTF-8%3AAsesor%20Profesional%20de%20Inversiones%20Inmobiliarias%0D%0AORG%3BCHARSET%3DUTF-8%3ACiudad%20Maderas%20Terrenos%20Residenciales%0D%0AURL%3BCHARSET%3DUTF-8%3Ahttps%3A%2F%2Finteminer.vercel.app%2F63a259516d03a43cafaaf651%0D%0AREV%3A2023-09-06T20%3A55%3A39.811Z%0D%0AEND%3AVCARD%0D%0A"
                download="contact.vcf"
                className="m-auto mb-2 gap-2 flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2 text-sm text-white"
              >
                Añadir a contactos
                <DownloadIcon className="w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
