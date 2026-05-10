import SearchIconCs from "@/public/Icons/SearchIconCs";

export function SearchInput({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="w-full h-12 bg-[#2A2727] rounded-md flex py-1 items-center pl-1.5 pr-1.25 gap-2">
      <div className="h-8 w-8 rounded-full flex items-center justify-center">
        <SearchIconCs fill="#ffffff" width={20} height={20} />
      </div>

      <input
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-[14px] bg-transparent placeholder:text-white outline-none flex-1 text-white"
      />
    </div>
  );
}
