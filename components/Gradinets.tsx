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

function Gradinets({
  iconSettings,
  onIconSettingsChange,
  updateIconSetting,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 pb-4">
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
      <button
        className={`w-24 h-24 rounded-md transition-all border-2 overflow-hidden flex items-center justify-center ${
          iconSettings.backgroundType === "gradient" &&
          iconSettings.selectedGradient === "gradient"
            ? "border-white ring-2 ring-white/20"
            : "border-white/5 hover:border-white/20"
        }`}
        onClick={() => {
          onIconSettingsChange({
            ...iconSettings,
            backgroundType: "gradient",
            selectedGradient: "gradient",
          });
        }}
      >
        <div className="w-full h-full gradient" />
      </button>
      <button
        className={`w-24 h-24 rounded-md transition-all border-2 overflow-hidden flex items-center justify-center ${
          iconSettings.backgroundType === "gradient" &&
          iconSettings.selectedGradient === "gradient2"
            ? "border-white ring-2 ring-white/20"
            : "border-white/5 hover:border-white/20"
        }`}
        onClick={() => {
          onIconSettingsChange({
            ...iconSettings,
            backgroundType: "gradient",
            selectedGradient: "gradient2",
          });
        }}
      >
        <div className="w-full h-full gradient2" />
      </button>
      <button
        className={`w-24 h-24 rounded-md transition-all border-2 overflow-hidden flex items-center justify-center ${
          iconSettings.backgroundType === "gradient" &&
          iconSettings.selectedGradient === "gradient3"
            ? "border-white ring-2 ring-white/20"
            : "border-white/5 hover:border-white/20"
        }`}
        onClick={() => {
          onIconSettingsChange({
            ...iconSettings,
            backgroundType: "gradient",
            selectedGradient: "gradient3",
          });
        }}
      >
        <div className="w-full h-full gradient3" />
      </button>
      <button
        className={`w-24 h-24 rounded-md transition-all border-2 overflow-hidden flex items-center justify-center ${
          iconSettings.backgroundType === "gradient" &&
          iconSettings.selectedGradient === "gradient4"
            ? "border-white ring-2 ring-white/20"
            : "border-white/5 hover:border-white/20"
        }`}
        onClick={() => {
          onIconSettingsChange({
            ...iconSettings,
            backgroundType: "gradient",
            selectedGradient: "gradient4",
          });
        }}
      >
        <div className="w-full h-full gradient4" />
      </button>
      <button
        className={`w-24 h-24 rounded-md transition-all border-2 overflow-hidden flex items-center justify-center ${
          iconSettings.backgroundType === "gradient" &&
          iconSettings.selectedGradient === "gradient5"
            ? "border-white ring-2 ring-white/20"
            : "border-white/5 hover:border-white/20"
        }`}
        onClick={() => {
          onIconSettingsChange({
            ...iconSettings,
            backgroundType: "gradient",
            selectedGradient: "gradient5",
          });
        }}
      >
        <div className="w-full h-full gradient5" />
      </button>
    </div>
  );
}

export default Gradinets;
