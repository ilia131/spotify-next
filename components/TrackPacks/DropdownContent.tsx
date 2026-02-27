import { cn } from "@/utils/cn";
import { SearchInput } from "./SearchInput";
interface Props {
  isOpen: boolean;
}

export function DropdownContent({ isOpen }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "rounded-b-[10px]",
        "bg-[rgba(217,217,217 0.2)]",
        "backdrop-blur-sm border border-white/30",
        "flex flex-col gap-2.5",
        "animate-in fade-in slide-in-from-top-1 duration-200"
      )}
    >
      <div className="w-full h-15 bg-white/20 rounded-b-lg flex items-center justify-center px-4.25 border-x-[0.25px] border-white/50">
        <SearchInput />
      </div>
    </div>
  );
}