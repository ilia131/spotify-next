"use client";

import Image from "next/image";
import VerifyedText from "./VerifyedText";
import AboutVerifyArtist from "./AboutVerifyArtist";
import TitleMusic from "../ArtistTabs/TitleMusic";
import { Artist } from "@/redux/services/artistApislice";
import { useLanguage } from "@/i18n/LanguageProvider";

const ArtistVerify = ({ data }: { data: Artist }) => {
  const { t } = useLanguage();

  return (
    <div className="grid pl-4.5 mt-4 gap-3">
      <TitleMusic title={t("artist.about")} />

      <div className="w-full h-91.5 pr-4 relative">
        <Image
          width={358}
          height={366}
          src={data?.profile_pic}
          alt={data?.artistname || "artist"}
          className="w-full h-91.5 object-cover"
          unoptimized
        />

        <VerifyedText />

        <AboutVerifyArtist data={data} />
      </div>
    </div>
  );
};

export default ArtistVerify;