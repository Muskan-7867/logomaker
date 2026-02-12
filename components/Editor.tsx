"use client";
import React, { useEffect, useRef, useState } from "react";
import * as motion from "framer-motion/client";
import { Canvas } from "fabric";
import IconGrid from "./LucideIcons";
import Hugeicons from "./Hugeicons";
import EmojiPicker from "./Emoji";
import { ToolButton } from "./ToolButton";
import { loadSVGFromString, util, Textbox } from "fabric";
import { renderToStaticMarkup } from "react-dom/server";
import { icons } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";

type Props = {};

export default function Editor({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLibrary, setActiveLibrary] = useState<
    "all" | "hugeicons" | "lucide" | "emoji"
  >("all");

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

  const addIcon = (iconName: string) => {
    if (!canvas) return;

    const IconComponent = icons[iconName as keyof typeof icons];
    if (!IconComponent) return;

    const svgString = renderToStaticMarkup(<IconComponent />);

    loadSVGFromString(svgString)
      .then(({ objects, options }) => {
        const validObjects = objects.filter((obj) => obj !== null);
        const obj = util.groupSVGElements(validObjects as any, options);
        obj.set({
          left: 250,
          top: 250,
          originX: "center",
          originY: "center",
        });
        obj.scaleToWidth(100);
        canvas.add(obj);
        canvas.renderAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addHugeIcon = (icon: any) => {
    if (!canvas) return;

    const svgString = renderToStaticMarkup(<HugeiconsIcon icon={icon} />);

    loadSVGFromString(svgString)
      .then(({ objects, options }) => {
        const validObjects = objects.filter((obj) => obj !== null);
        const obj = util.groupSVGElements(validObjects as any, options);
        obj.set({
          left: 250,
          top: 250,
          originX: "center",
          originY: "center",
        });
        obj.scaleToWidth(100);
        canvas.add(obj);
        canvas.renderAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addEmoji = (emoji: string) => {
    if (!canvas) return;
    const text = new Textbox(emoji, {
      left: 250,
      top: 250,
      originX: "center",
      originY: "center",
      fontSize: 100,
    });
    canvas.add(text);
    canvas.renderAll();
  };

  return (
    <div className="relative h-screen flex flex-col bg-black pt-24 text-white">
      <div className="flex-1 flex flex-row items-stretch justify-center px-4 h-screen ">
        {/* left sidebar */}
        <div className="w-96 bg-zinc-950  p-4 flex flex-col h-[calc(100vh-6rem)] overflow-y-scroll thin-scrollbar sticky top-0">
          <div className="mb-4">
            <input
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-white/10 rounded outline-none"
            />
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveLibrary("all")}
              className={`px-3 py-2 rounded text-xs transition-colors border ${
                activeLibrary === "all"
                  ? "bg-zinc-700 border-white/20"
                  : "bg-zinc-800 hover:bg-zinc-700 border-white/5"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveLibrary("lucide")}
              className={`px-3 py-2 rounded text-xs transition-colors border ${
                activeLibrary === "lucide"
                  ? "bg-zinc-700 border-white/20"
                  : "bg-zinc-800 hover:bg-zinc-700 border-white/5"
              }`}
            >
              lucide
            </button>
            <button
              onClick={() => setActiveLibrary("hugeicons")}
              className={`px-3 py-2 rounded text-xs transition-colors border ${
                activeLibrary === "hugeicons"
                  ? "bg-zinc-700 border-white/20"
                  : "bg-zinc-800 hover:bg-zinc-700 border-white/5"
              }`}
            >
              hugeicons
            </button>

            <button
              onClick={() => setActiveLibrary("emoji")}
              className={`px-3 py-2 rounded text-xs transition-colors border ${
                activeLibrary === "hugeicons"
                  ? "bg-zinc-700 border-white/20"
                  : "bg-zinc-800 hover:bg-zinc-700 border-white/5"
              }`}
            >
              Emoji
            </button>
          </div>

          <div className="flex-1 pr-2 space-y-6">
            {activeLibrary === "all" && (
              <>
                <div>
                  <div>
                    <div className="text-xs text-gray-400 mb-2 uppercase">
                      Lucide
                    </div>
                    <IconGrid
                      searchQuery={searchQuery}
                      onSelect={(iconName) => {
                        addIcon(iconName);
                      }}
                    />
                  </div>

                  <div className="text-xs text-gray-400 mb-2 uppercase">
                    Hugeicons
                  </div>
                  <Hugeicons onSelect={addHugeIcon} />
                </div>

                <div>
                  <div className="text-xs text-gray-400 mb-2 uppercase">
                    Emoji
                  </div>
                  <EmojiPicker onSelect={addEmoji} />
                </div>
              </>
            )}

            {activeLibrary === "hugeicons" && (
              <Hugeicons onSelect={addHugeIcon} />
            )}

            {activeLibrary === "lucide" && (
              <IconGrid
                searchQuery={searchQuery}
                onSelect={(iconName) => {
                  addIcon(iconName);
                }}
              />
            )}

            {activeLibrary === "emoji" && <EmojiPicker onSelect={addEmoji} />}
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
                    className="rounded-lg shadow-2xl border border-white/10 text-white"
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
