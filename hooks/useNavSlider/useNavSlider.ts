import { useState, useCallback, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FilterItem } from "@/components/FilterSlider/types";

export const useNavSlider = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticPath, setOptimisticPath] = useState<string | null>(null);

  const currentPath = optimisticPath === pathname ? pathname : (optimisticPath ?? pathname);

  const isActive = useCallback((item: FilterItem) => {
    if (item.name === "All") {
      return currentPath === "/" || currentPath === "/browse";
    }
    return currentPath.startsWith(item.href);
  }, [currentPath]);

  const handleClick = useCallback((item: FilterItem) => {
    if (pathname === item.href) return;

    setOptimisticPath(item.href);

    startTransition(() => {
      router.push(item.href);
    });
  }, [pathname, router]);

  return {
    isActive,
    handleClick,
    isLoading: isPending, // این را به کامپوننت بده تا لودینگ فعال شود
  };
};