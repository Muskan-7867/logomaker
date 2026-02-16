export const ToolButton = ({
  label,
  icon,
  active = false,
  onClick,
}: {
  label: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center  px-3 py-1.5 justify-center rounded transition-colors ${
      active
        ? "bg-zinc-800 text-white"
        : "text-gray-400 hover:bg-zinc-800/50 hover:text-white border border-white/10"
    }`}
  >
    <span className="text-lg">{icon}</span>

    <span className="text-sm ">{label}</span>
  </button>
);


