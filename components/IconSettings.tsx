import React from "react";

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
  updateIconSetting: (key: keyof IconSettings, value: any) => void;
};

function IconSettingsPage({
  iconSettings,
  updateIconSetting,
}: Props) {
  const sliderClass =
    "w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white";
  return (
    <>
      {/* Size */}
      <div>
        <label className="text-xs text-gray-400">
          Size ({iconSettings.size}px)
        </label>
        <input
          type="range"
          min={20}
          max={4000}
          value={iconSettings.size}
          onChange={(e) => updateIconSetting("size", Number(e.target.value))}
          className={sliderClass}
        />
      </div>

      {/* Rotate */}
      <div>
        <label className="text-xs text-gray-400">
          Rotate ({iconSettings.rotate}°)
        </label>
        <input
          type="range"
          min={0}
          max={360}
          value={iconSettings.rotate}
          onChange={(e) => updateIconSetting("rotate", Number(e.target.value))}
          className={sliderClass}
        />
      </div>

      {/* Stroke Width */}
      <div>
        <label className="text-xs text-gray-400">
          Stroke Width ({iconSettings.strokeWidth})
        </label>
        <input
          type="range"
          min={0}
          max={20}
          step={0.5}
          value={iconSettings.strokeWidth}
          onChange={(e) =>
            updateIconSetting("strokeWidth", Number(e.target.value))
          }
          className={sliderClass}
        />
      </div>

      {/* Stroke Opacity */}
      <div>
        <label className="text-xs text-gray-400">
          Stroke Opacity ({iconSettings.strokeOpacity})
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={iconSettings.strokeOpacity}
          onChange={(e) =>
            updateIconSetting("strokeOpacity", Number(e.target.value))
          }
          className={sliderClass}
        />
      </div>
    </>
  );
}

export default IconSettingsPage;
