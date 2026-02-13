"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, IText } from "fabric";
import EditorPreview from "./EditorPreview";
import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import {

  Rect,
  Circle,
  Triangle,
  Line,
} from "fabric";


type Props = {};
type IconSettings = {
   size: number;
   color: string;
   rotate: number;
   strokeWidth: number;
   strokeOpacity: number;
}

export default function Editor({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const fabricRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });
      fabricRef.current = initCanvas;
      initCanvas.backgroundColor = "#18181B";
      initCanvas.renderAll();
      setCanvas(initCanvas);
      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

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

  // Handle tool change
  const handleToolChange = (tool: string) => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
     const center = canvas.getCenterPoint();

    if (tool === "text") {
      const text = new IText("Your Brand", {
        left: 200,
        top: 200,
        fill: "#ffffff",
        fontSize: 40,
        fontFamily: "Arial",
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
      fill: "#3b82f6",
      left: center.x,
      top: center.y,
      originX: "center",
      originY: "center",
      rx: 10, // rounded corners
      ry: 10,
    });
     canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  }

  };

  const handleIconSettingsChange = (settings: IconSettings) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    activeObject.set({
      scaleX: settings.size / 100,
      scaleY: settings.size / 100,
      angle: settings.rotate,
      strokeWidth: settings.strokeWidth,
      stroke: settings.color,
      opacity: settings.strokeOpacity,
    });

    canvas.renderAll();
  };

  return (
    <div className="relative h-screen flex flex-col  pt-24 text-white">
      <div className="flex-1 flex flex-row items-stretch justify-center px-4 h-screen ">
        {/* left sidebar */}
        <LeftSidebar canvas={canvas} />

        {/* Editor Preview */}
        <EditorPreview canvasRef={canvasRef} />

        {/* Right Sidebar */}
        <RightSidebar onToolChange={handleToolChange}  onIconSettingsChange={handleIconSettingsChange}/>
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
