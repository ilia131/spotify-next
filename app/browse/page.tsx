"use client";

import FilterSlider from "@/components/FilterSlider/FilterSlider";
import { FilterItem } from "@/components/FilterSlider/types";

const filters : FilterItem[] = [
  {
    name: "All",
    href: "/browse",
    height: "h-[34px]",
    padding: "px-4",
    width: "w-[52px]",
  },
  {
    name: "Music",
    href: "/browse/music",
    height: "h-[34px]",
    padding: "px-4",
    width: "w-[71px]",
  },
  {
    name: "Albums",
    href: "/browse/albums",
    height: "h-[34px]",
    padding: "px-5",
    width: "w-[86px]",
  },
  {
    name: "Trackpacks",
    href: "/browse/trackpacks",
    height: "h-[34px]",
    padding: "px-[20.5px]",
    width: "w-[108px]",
  },
];

export default function BrowsePage() {
    
  return  <FilterSlider />
}
