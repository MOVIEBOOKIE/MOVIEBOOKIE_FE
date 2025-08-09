export default function TicketSkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-xl bg-gray-950">
      <div className="relative h-41.75 w-full bg-gray-800" />
      <div className="mt-5 mb-5 flex flex-col gap-3 px-4">
        <div className="h-4 w-3/4 rounded bg-gray-800" />
        <div className="h-3 w-1/2 rounded bg-gray-700" />
        <div className="mt-1.75 h-3 w-24 rounded bg-gray-700" />
      </div>
    </div>
  );
}
