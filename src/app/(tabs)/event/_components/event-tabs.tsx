import { useState } from "react";
import { Card, ToggleTab } from "@/components";
import { MOCK_DATA } from "@/mocks/mock-data";
import { EmptyIcon } from "@/icons/index";

interface EventTabProps {
  type: "모집" | "참여" | "티켓";
  statusMap: Record<string, string[]>;
}

export default function EventTab({ type, statusMap }: EventTabProps) {
  const [selected, setSelected] = useState<string>(Object.keys(statusMap)[0]);

  const filteredEvents = MOCK_DATA.filter((event) =>
    statusMap[selected].includes(event.statusBadge),
  );

  return (
    <div className="mt-5">
      <ToggleTab
        options={Object.keys(statusMap)}
        selected={selected}
        onSelect={setSelected}
        withSuffix="이벤트"
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
          <div className="flex flex-col items-center justify-center pt-11 text-center text-gray-500">
            <EmptyIcon />
            <p className="body-3-medium mt-3.5 text-gray-800">
              아직 모집 이벤트가 없어요 <br />
              지금 바로 나만의 이벤트를 만들어보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
