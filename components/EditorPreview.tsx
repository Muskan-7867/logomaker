import React from 'react'

type Props = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>
}

function EditorPreview({canvasRef}: Props) {
  return (
     <div
          // initial={{ opacity: 0, y: 40 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 1, delay: 0.3 }}
          className="w-full  max-w-6xl"
        >
          <div className="overflow-hidden">
            {/* Editor Body */}
            <div className="flex">
              {/* Canvas Area */}
              <div className="flex-1 relative flex items-center justify-center h-screen">
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
        </div>
  )
}

export default EditorPreview