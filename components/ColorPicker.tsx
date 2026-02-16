"use client";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  color: string;
  onChange: (hex: string) => void;
};

// --- Utilities ---

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
};

const hsvToRgb = (h: number, s: number, v: number) => {
  h /= 360;
  s /= 100;
  v /= 100;
  let r = 0,
    g = 0,
    b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      ((r = v), (g = t), (b = p));
      break;
    case 1:
      ((r = q), (g = v), (b = p));
      break;
    case 2:
      ((r = p), (g = v), (b = t));
      break;
    case 3:
      ((r = p), (g = q), (b = v));
      break;
    case 4:
      ((r = t), (g = p), (b = v));
      break;
    case 5:
      ((r = v), (g = p), (b = q));
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

export default function ColorPicker({ color, onChange }: Props) {
  const [hsv, setHsv] = useState({ h: 0, s: 0, v: 0 });
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [hex, setHex] = useState(color);

  const boardRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  // Sync internal state when prop changes (external update)
  useEffect(() => {
    if (color !== hex) {
      const newRgb = hexToRgb(color);
      const newHsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
      setHex(color);
      setRgb(newRgb);
      setHsv(newHsv);
    }
  }, [color]);

  const updateFromHsv = (h: number, s: number, v: number) => {
    const newRgb = hsvToRgb(h, s, v);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHsv({ h, s, v });
    setRgb(newRgb);
    setHex(newHex);
    onChange(newHex);
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    const newHsv = rgbToHsv(r, g, b);
    const newHex = rgbToHex(r, g, b);
    setRgb({ r, g, b });
    setHsv(newHsv);
    setHex(newHex);
    onChange(newHex);
  };

  const handleBoardMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const update = (moveEvent: any) => {
      if (!boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      const clientX =
        "touches" in moveEvent
          ? moveEvent.touches[0].clientX
          : moveEvent.clientX;
      const clientY =
        "touches" in moveEvent
          ? moveEvent.touches[0].clientY
          : moveEvent.clientY;

      let x = (clientX - rect.left) / rect.width;
      let y = (clientY - rect.top) / rect.height;
      x = Math.max(0, Math.min(1, x));
      y = Math.max(0, Math.min(1, y));

      updateFromHsv(hsv.h, x * 100, (1 - y) * 100);
    };

    update(e);
    const handleMove = (ev: MouseEvent | TouchEvent) => update(ev);
    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
  };

  const handleHueMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const update = (moveEvent: any) => {
      if (!hueRef.current) return;
      const rect = hueRef.current.getBoundingClientRect();
      const clientX =
        "touches" in moveEvent
          ? moveEvent.touches[0].clientX
          : moveEvent.clientX;

      let x = (clientX - rect.left) / rect.width;
      x = Math.max(0, Math.min(1, x));
      updateFromHsv(x * 360, hsv.s, hsv.v);
    };

    update(e);
    const handleMove = (ev: MouseEvent | TouchEvent) => update(ev);
    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Saturation/Brightness Board */}
      <div
        ref={boardRef}
        onMouseDown={handleBoardMouseDown}
        onTouchStart={handleBoardMouseDown}
        className="relative w-full h-40 rounded-lg cursor-crosshair overflow-hidden"
        style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-white to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
        <div
          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            backgroundColor: hex,
          }}
        />
      </div>

      {/* Hue Slider */}
      <div
        ref={hueRef}
        onMouseDown={handleHueMouseDown}
        onTouchStart={handleHueMouseDown}
        className="relative w-full h-4 rounded-full cursor-pointer"
        style={{
          background:
            "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
        }}
      >
        <div
          className="absolute w-5 h-5 bg-white border-2 border-zinc-800 rounded-full shadow-md top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
          style={{ left: `${(hsv.h / 360) * 100}%` }}
        />
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={hex.replace("#", "").toUpperCase()}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length <= 6) {
                setHex("#" + val);
                if (val.length === 6) onChange("#" + val);
              }
            }}
            className="w-full bg-zinc-800 text-white text-[10px] text-center py-1 rounded border border-white/5 uppercase"
          />
          <span className="text-[10px] text-zinc-500 mt-1">HEX</span>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="number"
            min={0}
            max={255}
            value={rgb.r}
            onChange={(e) =>
              updateFromRgb(Number(e.target.value), rgb.g, rgb.b)
            }
            className="w-full bg-zinc-800 text-white text-[10px] text-center py-1 rounded border border-white/5"
          />
          <span className="text-[10px] text-zinc-500 mt-1">R</span>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="number"
            min={0}
            max={255}
            value={rgb.g}
            onChange={(e) =>
              updateFromRgb(rgb.r, Number(e.target.value), rgb.b)
            }
            className="w-full bg-zinc-800 text-white text-[10px] text-center py-1 rounded border border-white/5"
          />
          <span className="text-[10px] text-zinc-500 mt-1">G</span>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="number"
            min={0}
            max={255}
            value={rgb.b}
            onChange={(e) =>
              updateFromRgb(rgb.r, rgb.g, Number(e.target.value))
            }
            className="w-full bg-zinc-800 text-white text-[10px] text-center py-1 rounded border border-white/5"
          />
          <span className="text-[10px] text-zinc-500 mt-1">B</span>
        </div>
      </div>
    </div>
  );
}
