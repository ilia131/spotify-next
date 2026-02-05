export default function Loading() {
    return (
      <section className="p-4 animate-pulse">
        <div className="h-10 w-full bg-neutral-800 rounded-md mb-4" />
  
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 bg-neutral-800 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }
