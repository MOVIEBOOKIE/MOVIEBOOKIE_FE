import { useState } from "react";
import { Card } from "@/components";
import ToggleTab from "./event-toggle";
import { MOVIE_LISTS } from "@/mocks/movie-list";

const STATUS_MAP = {
  모집: ["모집중", "모집완료", "모집취소"],
  확정: ["대관확정", "상영완료"],
};

export default function RecruitmentTab() {
  const [selected, setSelected] = useState<"모집" | "확정">("모집");

  const filteredEvents = MOVIE_LISTS.filter((event) =>
    STATUS_MAP[selected].includes(event.statusBadge),
  );

  return (
    <div className="mt-5">
      <ToggleTab
        options={["모집", "확정"]}
        selected={selected}
        onSelect={(selected) => setSelected(selected as "모집" | "확정")}
      />

      <div className="mt-6 flex flex-col">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index}>
              <Card
                imageUrl={event.imageUrl}
                category={event.category}
                title={event.title}
                placeAndDate={event.placeAndDate}
                description={event.description}
                statusBadge={event.statusBadge}
                progressRate={event.progressRate}
                estimatedPrice={event.estimatedPrice}
              />
              {index < filteredEvents.length - 1 && (
                <div className="my-4 h-px w-full bg-gray-950" />
              )}
            </div>
          ))
        ) : (
          <p className="mt-8 text-center text-gray-500">
            해당하는 이벤트가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
