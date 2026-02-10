"use client";

import { icons } from "lucide-react";
import React from "react";

type IconName = keyof typeof icons;

export default function IconGrid({
  onSelect,
  searchQuery = "",
}: {
  onSelect?: (iconName: IconName) => void;
  searchQuery?: string;
}) {
  const iconEntries = (
    Object.entries(icons) as [IconName, (props: any) => React.JSX.Element][]
  )
    .filter(([name]) => name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 100);

  return (
    <div className="grid grid-cols-4 gap-3">
      {iconEntries.map(([name, Icon]) => (
        <button
          key={name}
          onClick={() => onSelect?.(name)}
          title={name}
          className="flex items-center justify-center p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 transition "
        >
          <Icon className="w-5 h-5 text-white" />
          
        </button>
        
      ))}
    </div>
  );
}
