"use client";
import React, { useState } from "react";
import { ToolButton } from "./ToolButton";

type BrandType = "Logo" | "Icon" | "Symbol" | "Text";
type ToolType = "text" | "shape" | "icon" | "image";

type IconSettings = {
  size: number;
  rotate: number;
  strokeWidth: number;
  strokeOpacity: number;
  color: string;
};

type Props = {
  onBrandChange?: (brand: BrandType) => void;
  onToolChange?: (tool: ToolType) => void;
  onIconSettingsChange?: (settings: IconSettings) => void;
};

function RightSidebar({
  onBrandChange,
  onToolChange,
  onIconSettingsChange,
}: Props) {
  const [activeBrand, setActiveBrand] = useState<BrandType>("Logo");
  const [activeTool, setActiveTool] = useState<ToolType>("text");

  const [iconSettings, setIconSettings] = useState<IconSettings>({
    size: 120,
    rotate: 0,
    strokeWidth: 2,
    strokeOpacity: 1,
    color: "#ffffff",
  });

  const updateIconSetting = (key: keyof IconSettings, value: any) => {
    const updated = { ...iconSettings, [key]: value };
    setIconSettings(updated);
    onIconSettingsChange?.(updated);
  };

  const handleBrandClick = (brand: BrandType) => {
    setActiveBrand(brand);
    onBrandChange?.(brand);
  };

  const handleToolClick = (tool: ToolType) => {
    setActiveTool(tool);
    onToolChange?.(tool);
  };

  const brandButtonClass = (brand: BrandType) =>
    `px-3 py-2 rounded text-xs transition-colors border ${
      activeBrand === brand
        ? "bg-white text-black border-white"
        : "bg-zinc-800 hover:bg-zinc-700 border-white/5 text-white"
    }`;

  const sliderClass =
    "w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white";

  return (
    <div className="w-64 bg-zinc-950 border-r border-white/10 p-4 overflow-y-auto">
      <div className="space-y-4">
        <div className="text-xs text-gray-500 uppercase font-semibold">
          Brand Name
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            className={brandButtonClass("Icon")}
            onClick={() => handleBrandClick("Icon")}
          >
            Icon
          </button>

          <button
            className={brandButtonClass("Symbol")}
            onClick={() => handleBrandClick("Symbol")}
          >
            Symbol
          </button>

          <button
            className={brandButtonClass("Text")}
            onClick={() => handleBrandClick("Text")}
          >
            Text
          </button>
        </div>

        {/* Tool Buttons */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <ToolButton
            label="Text"
            icon="A"
            active={activeTool === "text"}
            onClick={() => handleToolClick("text")}
          />
          <ToolButton
            label="Shape"
            icon="◆"
            active={activeTool === "shape"}
            onClick={() => handleToolClick("shape")}
          />
          <ToolButton
            label="Icon"
            icon="★"
            active={activeTool === "icon"}
            onClick={() => handleToolClick("icon")}
          />
          <ToolButton
            label="Image"
            icon="⬜"
            active={activeTool === "image"}
            onClick={() => handleToolClick("image")}
          />
        </div>

        {/* ICON CONTROLS */}
        {activeTool === "icon" && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="text-xs text-gray-500 uppercase font-semibold">
              Icon Settings
            </div>

            {/* Size */}
            <div>
              <label className="text-xs text-gray-400">
                Size ({iconSettings.size}px)
              </label>
              <input
                type="range"
                min={20}
                max={400}
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

            {/* Icon Color */}
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Icon Color
              </label>
              <input
                type="color"
                value={iconSettings.color}
                onChange={(e) => updateIconSetting("color", e.target.value)}
                className="w-full h-10 bg-transparent cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSidebar;
