"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

const ViewsMonthly = ({
  monthly_listeners,
}: {
  monthly_listeners: number;
}) => {
  const { t } = useLanguage();

  return (
    <p className="text-[13px] text-[rgba(255,255,255,0.6)]">
      {monthly_listeners} {t("artist.monthlyListeners")}
    </p>
  );
};

export default ViewsMonthly;