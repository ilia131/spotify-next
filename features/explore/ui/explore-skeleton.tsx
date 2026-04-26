const ExploreSkeleton = () => {
    return (
      <div className="grid grid-cols-3 auto-rows-[140px] gap-0.5">
        {Array.from({ length: 12 }).map((_, i) => {
          const patternIndex = i % 10;
          const span = patternIndex === 0 ? "col-span-2 row-span-2" : "";
  
          return (
            <div
              key={i}
              className={`bg-[#272727] animate-pulse ${span}`}
            />
          );
        })}
      </div>
    );
  };

export default ExploreSkeleton
  