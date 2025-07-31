export default function CinemaSkeletonCard() {
  return (
    <div className="px-5">
      <div className="relative flex animate-pulse gap-4 border-b border-gray-950 py-5">
        <div className="relative z-20 flex-1 gap-3">
          <div className="mb-2 flex flex-wrap gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-5 w-12 rounded-[4px] bg-gray-800" />
            ))}
          </div>
          <div className="mb-2 h-5 w-3/5 rounded bg-gray-700" />
          <div className="h-4 w-2/5 rounded bg-gray-700" />
          <div className="mt-1 h-4 w-1/3 rounded bg-gray-700" />
        </div>
        <div className="relative z-20 h-30 w-30 shrink-0 overflow-hidden rounded-xl bg-gray-800" />
      </div>
    </div>
  );
}
