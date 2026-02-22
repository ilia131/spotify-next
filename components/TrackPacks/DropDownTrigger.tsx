import { cn } from "@/utils/cn";
import DownArrow from "@/public/Icons/DownArrow";
interface Props {
  isOpen: boolean ;
  onClick: () => void;
}

export function DropdownTrigger({ isOpen, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-full h-5.75 flex items-center justify-center px-2 cursor-pointer transition-all",
        "bg-linear-to-t from-[#44843C] to-[#31582b]",
        isOpen
          ? "rounded-t-[10px] border-x-[0.25px] border-t-[0.25px] border-white/50"
          : "rounded-[11px]"
      )}
    >
      <p className="text-[9px] text-white text-center">
        What do you want to buy ?
      </p>

      <DownArrow
        width={10}
        height={5}
        fill="#FFFFFF"
        className={cn(
          "absolute right-2 w-2.5 h-1.25 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </div>
  );
}