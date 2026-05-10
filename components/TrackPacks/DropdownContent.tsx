import { cn } from "@/utils/cn";
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
    
    </div>
  );
}
