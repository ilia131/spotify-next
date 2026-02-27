import { useAppDispatch } from "@/redux/hook";
import { toggleMenu } from "@/redux/features/uiSlice";

interface AccountButtonProps {
  label?: string;
}


const AccountButton = ({ label = "I"}: AccountButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(toggleMenu())}
      className="h-8.5 w-8.25 bg-[#121212] flex items-center justify-center"
      aria-label="Account"
    >
      <div className="h-8.5 w-8.25 bg-[#7D4B32] rounded-full flex items-center justify-center text-black/85 text-[19px]">
        {label}
      </div>
    </button>
  );
};

export default AccountButton;


