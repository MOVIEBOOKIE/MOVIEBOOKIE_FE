import { MOVIE_LISTS } from "@/mocks/movie-list";
import { useState } from "react";
import ToggleTab from "./event-toggle";
import { Card } from "@/components";

interface EventTabProps {
  type: "모집" | "참여" | "티켓";
  statusMap: Record<string, string[]>;
}

export default function EventTab({ type, statusMap }: EventTabProps) {
  const [selected, setSelected] = useState<string>(Object.keys(statusMap)[0]);

  const filteredEvents = MOVIE_LISTS.filter((event) =>
    statusMap[selected].includes(event.statusBadge),
  );

  return (
    <div className="mt-5">
      <ToggleTab
        options={Object.keys(statusMap)}
        selected={selected}
        onSelect={setSelected}
      />

      <div className="mt-6 flex flex-col">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={`${event.title}-${event.placeAndDate}`}>
              <Card {...event} />
              {index < filteredEvents.length - 1 && (
                <div className="my-4 h-px w-full bg-gray-950" />
              )}
            </div>
          ))
        ) : (
          <p className="mt-8 text-center text-gray-500">
            등록된 {type} 이벤트가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
