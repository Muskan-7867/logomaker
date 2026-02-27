import React from "react";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  backgroundType: "solid" | "gradient";
  selectedGradient?: string;
};

function EditorPreview({ canvasRef, backgroundType, selectedGradient }: Props) {
  return (
    <div
      // initial={{ opacity: 0, y: 40 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 1, delay: 0.3 }}
      className="w-full  max-w-6xl"
    >
      <div className="overflow-hidden">
        {/* Editor Body */}
        <div className="flex flex-col h-full w-full items-center justify-center">
          {/* Canvas Area */}
          <div className="relative flex items-center justify-center min-h-[400px] sm:min-h-[500px] lg:h-screen w-full py-4 px-2">
            {/* Canvas container with scaling for small screens */}
            <div className="flex items-center justify-center rounded-lg shadow-2xl border border-white/10 scale-[0.65] sm:scale-90 lg:scale-100 transition-all origin-center bg-zinc-900">
              <canvas ref={canvasRef} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPreview;
