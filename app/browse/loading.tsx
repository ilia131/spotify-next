export default function BrowseLoading() {
  return (
    <div className="flex h-[90vh] w-full items-center justify-center gap-1.5">
      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-300"></div>
    </div>
  );
}