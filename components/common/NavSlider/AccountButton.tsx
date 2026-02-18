interface AccountButtonProps {
  label?: string;
  onClick?: () => void;
}

const AccountButton = ({ label = "I", onClick }: AccountButtonProps) => {
  return (
    <button
      onClick={onClick}
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


