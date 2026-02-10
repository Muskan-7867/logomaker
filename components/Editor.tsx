"use client";
import React, { useEffect, useRef, useState } from "react";
import * as motion from "framer-motion/client";
import { Canvas } from "fabric";
import IconGrid from "./IconGrid";

type Props = {};

export default function Editor({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });

      initCanvas.backgroundColor = "#18181B";
      initCanvas.renderAll();
      setCanvas(initCanvas);
      return () => {
        initCanvas.dispose();
      };
    }
  }, []);
  return (
    <div className="relative h-screen flex flex-col bg-black pt-24 text-white">
      <div className="flex-1 flex flex-row items-stretch justify-center px-4 h-screen ">
        {/* left sidebar */}
        <div className="w-96 bg-zinc-950 border border-white p-4 flex flex-col h-screen overflow-y-scroll sticky top-0">
          <div className="mb-4">
            <input
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-white/10 rounded outline-none"
            />
          </div>
          <div className="flex-1  pr-2">
            <IconGrid
              searchQuery={searchQuery}
              onSelect={(iconName) => {
                console.log("Selected icon:", iconName);
                // later: add to Fabric canvas
              }}
            />
          </div>
        </div>

        {/* Editor Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-6xl"
        >
          <div className="overflow-hidden">
            {/* Editor Body */}
            <div className="flex">
              {/* Canvas Area */}
              <div className="flex-1  relative flex items-center justify-center p-8 min-h-[500px]">
                {/* Grid Background */}
                <div className="absolute inset-0  " />

                {/* Canvas */}
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="rounded-lg shadow-2xl border border-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <div className="w-64 bg-zinc-950 border-r border-white/10 p-4">
          <div className="space-y-2">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-3">
              Brand Name
            </div>
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs transition-colors border border-white/5">
                Logo
              </button>
              <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs transition-colors border border-white/5">
                Icon
              </button>
              <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs transition-colors border border-white/5">
                Symbol
              </button>
              <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs transition-colors border border-white/5">
                Text
              </button>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <ToolButton label="Text" icon="A" active />
              <ToolButton label="Shape" icon="◆" />
              <ToolButton label="Icon" icon="★" />
              <ToolButton label="Image" icon="⬜" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const ToolButton = ({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: string;
  active?: boolean;
}) => (
  <button
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
