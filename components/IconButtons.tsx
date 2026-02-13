import React from 'react'

type Props = {
    activeLibrary: string;
    setActiveLibrary: React.Dispatch<React.SetStateAction<"all" | "hugeicons" | "lucide" | "emoji">>
}

function IconButtons({ activeLibrary, setActiveLibrary }: Props) {
  return (
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
  )
}

export default IconButtons