import React from "react";

interface ItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Item({ icon, title, description }: ItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-gray-950 px-6 py-5 pr-21">
      <div>{icon}</div>
      <div>
        <h3 className="body-2-semibold text-gray-200">{title}</h3>
        <p className="body-3-regular mt-1.5 text-gray-400">{description}</p>
      </div>
    </div>
  );
}
