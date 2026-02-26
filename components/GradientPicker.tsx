import { bgGradients } from "./gradients";

type IconSettings = {
  size: number;
  rotate: number;
  strokeWidth: number;
  strokeOpacity: number;
  color: string;
  backgroundType: "solid" | "gradient";
  selectedGradient: string;
};

type Props = {
  iconSettings: any;
  onIconSettingsChange: (settings: any) => void;
  updateIconSetting: (key: keyof IconSettings, value: any) => void;
};

function GradientPicker({
  iconSettings,
  onIconSettingsChange,
  updateIconSetting,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 pb-4">
      <button
        className={`px-3 py-2 rounded text-xs transition-colors border ${
          iconSettings.backgroundType === "solid"
            ? "bg-white text-black border-white"
            : "bg-zinc-800 hover:bg-zinc-700 border-white/5 text-white"
        }`}
        onClick={() => updateIconSetting("backgroundType", "solid")}
      >
        Solid
      </button>

      {bgGradients.map((g, index) => (
        <button
          key={index}
          className={`w-16 h-16 rounded-md transition-all border-2 overflow-hidden flex items-center justify-center ${
            iconSettings.backgroundType === "gradient" &&
            iconSettings.selectedGradient === g.className
              ? "border-white ring-2 ring-white/20"
              : "border-white/5 hover:border-white/20"
          }`}
          onClick={() => {
            onIconSettingsChange({
              ...iconSettings,
              backgroundType: "gradient",
              selectedGradient: g.className,
            });
          }}
        >
          <div className="w-full h-full" style={{ background: g.background }} />
        </button>
      ))}
    </div>
  );
}

export default GradientPicker;
