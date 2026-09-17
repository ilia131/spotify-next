import { useState, useCallback, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FilterItem } from "@/components/FilterSlider/types";

export const useNavSlider = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [optimisticPath, setOptimisticPath] = useState<string | null>(null);

  const currentPath = optimisticPath ?? pathname;

  const isActive = useCallback(
    (item: FilterItem) => {
      // All
      if (item.href === "/browse" || item.href === "/") {
        return currentPath === item.href;
      }

      // سایر صفحات
      return (
        currentPath === item.href ||
        currentPath.startsWith(`${item.href}/`)
      );
    },
    [currentPath]
  );

  const handleClick = useCallback(
    (item: FilterItem) => {
      if (currentPath === item.href) {
        return;
      }

      setOptimisticPath(item.href);

      startTransition(() => {
        router.push(item.href);
      });
    },
    [currentPath, router]
  );

  return {
    isActive,
    handleClick,
    isLoading: isPending,
  };
};