import { useState } from "react";
import { usePathname , useRouter} from "next/navigation";
import { FilterItem } from "@/components/FilterSlider/types";



export const useNavSlider = (
  defaultActive?: string
) => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [active, setActive] = useState(defaultActive);

  
  
  const isActive = (item: FilterItem) => {
      if (item.name === "All") {
        return pathname === "/" || pathname === "/browse";
      }
  
      return pathname.startsWith(item.href);
    };
  
    const handleClick = (item: FilterItem) => {
      router.push(item.href);
    };
  return {
    active,
    setActive,
    isActive,
    handleClick,
  };
};
