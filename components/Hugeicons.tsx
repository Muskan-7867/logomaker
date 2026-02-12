import * as HugeIcons from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  onSelect?: (icon: any) => void;
}

export default function Hugeicons({ onSelect }: Props) {
  const hugeicons = Object.entries(HugeIcons).slice(0, 200);
  return (
    <div className="grid grid-cols-5 gap-4">
      {hugeicons.map(([name, icon]: any) => (
        <button
          key={name}
          onClick={() => onSelect?.(icon)}
          title={name}
          className="flex items-center justify-center p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 transition "
        >
          <HugeiconsIcon icon={icon} className="w-6 h-6 text-white" />
        </button>
      ))}
    </div>
  );
}
