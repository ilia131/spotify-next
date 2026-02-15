import PlusIconCs from "@/public/Icons/PlusIconCs";

interface CloseButtonProps {
    onClick: () => void;
  }

export  const CloseButton = ({ onClick }: CloseButtonProps) => (
    <button
      onClick={onClick}
      title="close"
      className="bg-[rgba(41,41,41,0.82)]  text-white rounded-full w-8 h-8 flex items-center justify-center rotate-45"
    >
      <PlusIconCs />
    </button>
);