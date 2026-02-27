"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, IText } from "fabric";
import EditorPreview from "./EditorPreview";
import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import { Rect, Circle, Triangle, Line } from "fabric";
import * as fabric from "fabric";
import { bgGradients } from "./gradients";
import { LayoutGrid, Edit3, Settings2 } from "lucide-react";

type Props = {
  onCanvasReady?: (canvas: Canvas) => void;
};
type IconSettings = {
  size: number;
  color: string;
  rotate: number;
  strokeWidth: number;
  strokeOpacity: number;
  backgroundType: "solid" | "gradient";
  selectedGradient: string;
};

// Helper function to convert gradient classes to Fabric.js color stops
const getGradientColors = (gradientClass: string) => {
  // Find the gradient from bgGradients by className
  const gradientDef = bgGradients.find((g) => g.className === gradientClass);

  if (!gradientDef) {
    // Fallback to first gradient if not found
    return parseGradientString(bgGradients[0].background);
  }

  return parseGradientString(gradientDef.background);
};

// Parse CSS linear-gradient string to Fabric.js color stops
const parseGradientString = (
  gradientStr: string,
): Array<{ offset: number; color: string }> => {
  // Extract color stops from the gradient string
  // Format: "#color percentage%"
  const colorStopRegex = /#[0-9a-fA-F]{6}\s+[\d.]+%/g;
  const matches = gradientStr.match(colorStopRegex);

  if (!matches) {
    // Fallback if parsing fails
    return [
      { offset: 0, color: "#a9caff" },
      { offset: 1, color: "#ffbaec" },
    ];
  }

  return matches.map((match) => {
    const [color, percentage] = match.trim().split(/\s+/);
    const offset = parseFloat(percentage) / 100;
    return { offset, color };
  });
};

export default function Editor({ onCanvasReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const fabricRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        hasControls: false,
      });
      fabricRef.current = initCanvas;
      initCanvas.backgroundColor = "#18181B";
      initCanvas.renderAll();
      setCanvas(initCanvas);
      onCanvasReady?.(initCanvas);
      return () => {
        initCanvas.dispose();
      };
    }
  }, [onCanvasReady]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricRef) return;

    const reader = new FileReader();
    reader.onload = () => {
      const image = reader.result as string;

      FabricImage.fromURL(image).then((img) => {
        const canvas = fabricRef.current!;
        // 🔹 Auto scale to fit inside canvas
        const maxWidth = canvas.getWidth() * 0.8;
        const maxHeight = canvas.getHeight() * 0.8;
        const scale = Math.min(maxWidth / img.width!, maxHeight / img.height!);

        img.scale(scale);
        // 🔹 Center the image
        const center = canvas.getCenterPoint();

        img.set({
          left: center.x,
          top: center.y,
          originX: "center",
          originY: "center",
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    };

    reader.readAsDataURL(file);
  };

  const [activeTool, setActiveTool] = useState<string>("text");
  const [iconSettings, setIconSettings] = useState<IconSettings>({
    size: 120,
    rotate: 0,
    strokeWidth: 2,
    strokeOpacity: 1,
    color: "#ffffff",
    backgroundType: "solid",
    selectedGradient: "gradient",
  });

  const updateIconSetting = (settings: IconSettings) => {
    setIconSettings(settings);
    const canvas = fabricRef.current;
    if (!canvas) return;

    // If Background is selected
    if (activeTool === "Background") {
      if (settings.backgroundType === "gradient") {
        // Apply Fabric.js gradient instead of CSS
        const gradientColors = getGradientColors(settings.selectedGradient);
        const gradient = new fabric.Gradient({
          type: "linear",
          coords: {
            x1: 0,
            y1: 0,
            x2: canvas.width || 500,
            y2: canvas.height || 500,
          },
          colorStops: gradientColors,
        });
        canvas.backgroundColor = gradient;
      } else {
        canvas.backgroundColor = settings.color;
      }
      canvas.requestRenderAll();
      return;
    }

    const activeObject = canvas.getActiveObject();

    const applyToObj = (obj: any) => {
      // Transformations
      obj.set({
        scaleX: settings.size / 100,
        scaleY: settings.size / 100,
        angle: settings.rotate,
        opacity: settings.strokeOpacity,
      });

      // Specific styles
      const applyStyle = (target: any) => {
        if (
          target.fill &&
          target.fill !== "none" &&
          target.fill !== "transparent"
        ) {
          target.set({ fill: settings.color });
        }
        if (
          target.stroke &&
          target.stroke !== "none" &&
          target.stroke !== "transparent"
        ) {
          target.set({
            stroke: settings.color,
            strokeWidth: settings.strokeWidth,
          });
        }
        if (
          target.type === "i-text" ||
          target.type === "text" ||
          target.type === "textbox"
        ) {
          target.set({ fill: settings.color });
          if (settings.strokeWidth > 0) {
            target.set({
              stroke: settings.color,
              strokeWidth: settings.strokeWidth,
            });
          } else {
            target.set({ strokeWidth: 0 });
          }
        }
      };

      if (obj.type === "group") {
        (obj as any).forEachObject((child: any) => applyStyle(child));
      } else {
        applyStyle(obj);
      }
    };

    if (activeObject) {
      applyToObj(activeObject);
    } else {
      // Apply to everything if nothing is selected
      canvas.getObjects().forEach(applyToObj);
    }

    canvas.requestRenderAll();
  };

  // Handle tool change
  const handleToolChange = (tool: string) => {
    setActiveTool(tool); // Sync tool status
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
    const center = canvas.getCenterPoint();

    if (tool === "text") {
      const text = new IText("Your Brand", {
        left: 200,
        top: 200,
        fill: iconSettings.color, // Use current settings
        fontSize: 40,
        fontFamily: "Arial",
        hasControls: false,
        scaleX: iconSettings.size / 100,
        scaleY: iconSettings.size / 100,
        angle: iconSettings.rotate,
        opacity: iconSettings.strokeOpacity,
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
    // ✅ Trigger file input for image
    if (tool === "image") {
      fileInputRef.current?.click();
    }

    // SHAPE
    if (tool === "shape") {
      // 🔹 Default shape (Rectangle)
      const rect = new Rect({
        width: 150,
        height: 100,
        fill: iconSettings.color, // Use current settings
        stroke: iconSettings.color,
        strokeWidth: iconSettings.strokeWidth,
        left: center.x,
        top: center.y,
        originX: "center",
        originY: "center",
        rx: 10, // rounded corners
        ry: 10,
        hasControls: false,
        scaleX: iconSettings.size / 100,
        scaleY: iconSettings.size / 100,
        angle: iconSettings.rotate,
        opacity: iconSettings.strokeOpacity,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    }
  };

  const downloadLogo = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Get data URL from canvas
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2, // Export at 2x resolution (1000x1000)
    });

    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.download = `logo-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative h-screen flex flex-col pt-4 text-white overflow-y-auto lg:overflow-hidden thin-scrollbar">
      <div className="flex-1 flex flex-col lg:flex-row items-stretch justify-center px-4 min-h-full">
        {/* left sidebar - Top on mobile */}
        <div className="w-full mt-[50rem] lg:mt-0 lg:w-96 order-1 lg:order-none">
          <LeftSidebar canvas={canvas} />
        </div>

        {/* Editor Preview - Center on mobile */}
        <div className="flex-1 w-full order-2 lg:order-none">
          <EditorPreview
            canvasRef={canvasRef}
            backgroundType={iconSettings.backgroundType}
            selectedGradient={iconSettings.selectedGradient}
          />
        </div>

        {/* Right Sidebar - Bottom on mobile */}
        <div className="w-full lg:w-88 order-3 lg:order-0 mb-12 lg:mb-0">
          <RightSidebar
            onToolChange={handleToolChange}
            iconSettings={iconSettings}
            onIconSettingsChange={updateIconSetting}
            activeTool={activeTool as any}
          />
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
