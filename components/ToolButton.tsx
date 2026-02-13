export const ToolButton = ({
  label,
  icon,
  active = false,
  onClick,
}: {
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${
      active
        ? "bg-zinc-800 text-white"
        : "text-gray-400 hover:bg-zinc-800/50 hover:text-white"
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);
