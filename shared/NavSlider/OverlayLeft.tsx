import AccountButton from "./AccountButton";

export const OverlayLeft = () => {
  return (
    <div className="absolute left-0 top-0 z-30 flex items-center border-none ">
      <AccountButton />
      <div className="h-8.5 w-3 bg-linear-to-r from-[#121212] to-transparent" />
    </div>
  );
};