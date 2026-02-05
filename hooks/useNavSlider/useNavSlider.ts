import { useState, useCallback, useTransition, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FilterItem } from "@/components/FilterSlider/types";

export const useNavSlider = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // برای مدیریت حالت در حال بارگذاری
  const [isPending, startTransition] = useTransition();
  // ذخیره مسیر کلیک شده برای تغییر آنی رنگ دکمه
  const [activeHref, setActiveHref] = useState<string | null>(null);

  // همگام‌سازی وضعیت داخلی با تغییر واقعی آدرس (مثلاً وقتی کاربر دکمه back می‌زند)
  useEffect(() => {
    setActiveHref(pathname);
  }, [pathname]);

  const currentPath = activeHref || pathname;

  const isActive = useCallback((item: FilterItem) => {
    if (item.name === "All") {
      return currentPath === "/" || currentPath === "/browse";
    }
    return currentPath.startsWith(item.href);
  }, [currentPath]);

  const handleClick = useCallback((item: FilterItem) => {
    if (pathname === item.href) return;

    // ۱. تغییر آنی وضعیت ظاهری دکمه
    setActiveHref(item.href);

    // ۲. شروع جابجایی بدون قفل کردن UI
    startTransition(() => {
      router.push(item.href);
    });
  }, [pathname, router]);

  return {
    isActive,
    handleClick,
    isPending, // می‌توانید از این برای نمایش یک لودینگ کوچک کنار دکمه استفاده کنید
  };
};