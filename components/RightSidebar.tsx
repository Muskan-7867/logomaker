"use client";
import { ToolButton } from "./ToolButton";
import ColorPicker from "./ColorPicker";
import Gradinets from "./Gradinets";
import IconSettingsPage from "./IconSettings";
import { useState } from "react";
import { Cross } from "lucide-react";

type BrandType = "Logo" | "Icon" | "Symbol" | "Text";
type ToolType = "text" | "shape" | "icon" | "image" | "Background";
type ShapeType = "rectangle" | "circle" | "triangle" | "line";

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
  onShapeSelect?: (shape: ShapeType) => void;
  iconSettings: IconSettings;
  onIconSettingsChange: (settings: IconSettings) => void;
  activeTool: ToolType;
};

function RightSidebar({
  onToolChange,
  iconSettings,
  onIconSettingsChange,
  activeTool,
  onShapeSelect,
}: Props) {
  const [selectedShape, setSelectedShape] = useState<ShapeType | null>(null);
  const updateIconSetting = (key: keyof IconSettings, value: any) => {
    const updated = { ...iconSettings, [key]: value };
    onIconSettingsChange(updated);
  };

  const handleToolClick = (tool: ToolType) => {
    onToolChange?.(tool);
    if (tool !== "shape") {
      setSelectedShape(null);
    }
  };

  return (
    <div className="w-full h-auto lg:w-88 lg:h-200 bg-zinc-950 border-r border-white/10 p-4 overflow-y-auto lg:overflow-y-scroll thin-scrollbar sticky top-0 flex flex-col pb-4">
      <div className="space-y-6 flex-1">
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

        {/* SHAPES PANEL */}
        {activeTool === "shape" && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="text-xs text-gray-500 uppercase font-semibold">
              Select Shape
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { type: "rectangle", icon: "▭" },
                { type: "circle", icon: "◯" },
                { type: "triangle", icon: "▲" },
                { type: "line", icon: "─" },
              ].map((shape) => (
                <button
                  key={shape.type}
                  onClick={() => {
                    setSelectedShape(shape.type as ShapeType); // 👈 highlight
                    onShapeSelect?.(shape.type as ShapeType); // 👈 add to canvas
                  }}
                  className={`p-4 rounded-lg flex items-center justify-center transition
        ${
          selectedShape === shape.type
            ? "bg-white text-black"
            : "bg-zinc-900 hover:bg-zinc-800"
        }`}
                >
                  {shape.icon}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ICON CONTROLS */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="text-xs text-gray-500 uppercase font-semibold">
            {activeTool === "Background"
              ? "Background Settings"
              : "Icon Settings"}
          </div>

          {activeTool === "Background" && (
            <Gradinets
              iconSettings={iconSettings}
              onIconSettingsChange={onIconSettingsChange}
              updateIconSetting={updateIconSetting}
            />
          )}

          {activeTool !== "Background" && (
            <>
              <IconSettingsPage
                iconSettings={iconSettings}
                updateIconSetting={updateIconSetting}
              />
              <ColorPicker
                color={iconSettings.color}
                onChange={(color) => updateIconSetting("color", color)}
              />
            </>
          )}

          {/* Advanced Color Picker */}
          {!(
            activeTool === "Background" &&
            iconSettings.backgroundType === "gradient"
          ) && (
            <div className="pt-8">
              {/* <ColorPicker
                color={iconSettings.color}
                onChange={(color) => updateIconSetting("color", color)}
              /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
