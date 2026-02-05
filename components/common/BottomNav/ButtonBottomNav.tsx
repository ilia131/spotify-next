import { JSX } from "react";
import { useRouter } from "next/navigation";

interface BottomNavItem {
    readonly name: string;
    readonly icon: JSX.Element;
    readonly label: string;
    readonly href : string
  }
  
  interface ButtonBottomNavProps {
    item: BottomNavItem;
    setActive: (name: string) => void;
    active: string;
  }
  

const ButtonBottomNav = ({item , setActive , active} : ButtonBottomNavProps) => {
    const router = useRouter();

    const handleClick = () => {
      setActive(item.name);      
      router.push(item.href);    
    };
  return (
     <button

            key={item.name}
            onClick={handleClick}
            className="flex flex-col items-center gap-1.25 justify-center text-white/70 hover:text-white transition-colors"
        >
            <div
            className={`${
                active === item.name ? "text-[rgba(255_255_255/1)] fill-[rgba(255_255_255/1)]" : "fill-[rgba(255_255_255/0.50)]"
            }`}
            >
            {item.icon}
            </div>
            <span 
            className={`${
            active === item.name ? "text-[rgba(255_255_255/1)] " : "text-[rgba(255_255_255/0.65)] "
            }text-[10px] text-[rgba(255_255_255/0.50)]`}
            >{item.label}</span>
        </button>
  )
}

export default ButtonBottomNav