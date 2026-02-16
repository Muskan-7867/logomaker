import React, { useEffect, useRef, useState } from "react";
import * as motion from "framer-motion/client";
import { Canvas } from "fabric";
import { useRouter } from "next/navigation";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 600,
        height: 400,
      });

      initCanvas.backgroundColor = "bg-zinc-800";
      initCanvas.renderAll();
      setCanvas(initCanvas);
      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const handleCreateLogo = () => {
    router.push("/editor");
  };

  return (
    <div className="relative min-h-screen flex flex-col  text-white">
      {/* Navbar */}
      <nav className="w-full px-8 py-4 flex items-center justify-between border-b border-white/10 relative z-50">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Logo Maker</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Examples
          </a>
          <a href="#" className="hover:text-white transition-colors">
            How It Works
          </a>
        </div>

        <button onClick={handleCreateLogo} className="px-6 py-2 bg-black text-white font-semibold rounded-lg transition-colors">
          Create Logo
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Don't let logo creation{" "}
            <span className="text-white">hold you back.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Choose from thousands of icon sets to design your own unique logo.
            <br />
            No coding required, completely free and open source.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3 bg-black text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
              Create Now
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button className="px-8 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-colors">
              How it works?
            </button>
          </div>
        </motion.div>

        {/* Editor Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-6xl"
        >
          <div className="bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-zinc-900/50">
              <div className="flex items-center gap-2">
             
                <span className="font-semibold text-sm">Just Logo</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-white transition-colors p-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </button>
                <button className="hover:text-white transition-colors p-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
                <button className="px-4 py-1.5 bg-black text-white font-semibold rounded text-xs transition-colors">
                  Download
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="flex">
              {/* Left Sidebar */}
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

              {/* Canvas Area */}
              <div className="flex-1 bg-zinc-900 relative flex items-center justify-center p-8 min-h-[500px]">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-10 bg-gray-800" />

                {/* Canvas */}
                <div className="relative">
                  <canvas ref={canvasRef} className="rounded-lg shadow-2xl" />
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-64 bg-zinc-950 border-l border-white/10 p-4">
                <div className="space-y-4">
                  <div className="text-xs text-gray-500 uppercase font-semibold mb-3">
                    Background
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-2 block">
                        Color
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-black border border-white/20"></div>
                        <input
                          type="text"
                          value="#FFA500"
                          readOnly
                          className="flex-1 bg-zinc-800 border border-white/10 rounded px-2 py-1 text-xs text-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-2 block flex items-center justify-between">
                        <span>Radius</span>
                        <span className="text-gray-500">0 px</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="0"
                        className="w-full accent-orange-500 h-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-2 block flex items-center justify-between">
                        <span>Stroke Width</span>
                        <span className="text-gray-500">1 px</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        defaultValue="1"
                        className="w-full accent-orange-500 h-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-2 block flex items-center justify-between">
                        <span>Stroke Opacity</span>
                        <span className="text-gray-500">100 %</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="100"
                        className="w-full accent-zinc-800 h-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

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

export default Hero;
