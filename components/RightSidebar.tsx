"use client";
import React, { useState } from "react";
import { ToolButton } from "./ToolButton";
import ColorPicker from "./ColorPicker";
import Gradinets from "./Gradinets";

type BrandType = "Logo" | "Icon" | "Symbol" | "Text";
type ToolType = "text" | "shape" | "icon" | "image" | "Background";

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
  onBrandChange?: (brand: BrandType) => void;
  onToolChange?: (tool: ToolType) => void;
  iconSettings: IconSettings;
  onIconSettingsChange: (settings: IconSettings) => void;
  activeTool: ToolType;
};

function RightSidebar({
  onToolChange,
  iconSettings,
  onIconSettingsChange,
  activeTool,
}: Props) {
  const updateIconSetting = (key: keyof IconSettings, value: any) => {
    const updated = { ...iconSettings, [key]: value };
    onIconSettingsChange(updated);
  };

  const handleToolClick = (tool: ToolType) => {
    onToolChange?.(tool);
  };

  const sliderClass =
    "w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white";

  return (
    <div className="w-88 h-[50rem] bg-zinc-950 border-r border-white/10 p-4 overflow-y-scroll thin-scrollbar sticky top-0">
      <div className="space-y-6">
        {/* Tool Buttons */}
        <div className="space-y-1  grid grid-cols-2 gap-2">
          <ToolButton
            label="Text"
            active={activeTool === "text"}
            onClick={() => handleToolClick("text")}
          />
          <ToolButton
            label="Shape"
            active={activeTool === "shape"}
            onClick={() => handleToolClick("shape")}
          />
          <ToolButton
            label="Background"
            active={activeTool === "Background"}
            onClick={() => handleToolClick("Background")}
          />

          <ToolButton
            label="Image"
            active={activeTool === "image"}
            onClick={() => handleToolClick("image")}
          />
        </div>

        {/* ICON CONTROLS */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="text-xs text-gray-500 uppercase font-semibold">
            {activeTool === "Background"
              ? "Background Settings"
              : "Icon Settings"}
          </div>

          {activeTool === "Background" && (
            <Gradinets iconSettings={iconSettings} onIconSettingsChange={onIconSettingsChange} updateIconSetting={updateIconSetting}/>
          )}

          {activeTool !== "Background" && (
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
                  onChange={(e) =>
                    updateIconSetting("size", Number(e.target.value))
                  }
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
                  onChange={(e) =>
                    updateIconSetting("rotate", Number(e.target.value))
                  }
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
          )}

          {/* Advanced Color Picker */}
          {!(
            activeTool === "Background" &&
            iconSettings.backgroundType === "gradient"
          ) && (
            <div className="pt-8">
              <label className="text-xs text-gray-500 uppercase font-semibold block mb-4">
                {activeTool === "Background"
                  ? "Background Color"
                  : "Stroke Color"}
              </label>
              <ColorPicker
                color={iconSettings.color}
                onChange={(color) => updateIconSetting("color", color)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
