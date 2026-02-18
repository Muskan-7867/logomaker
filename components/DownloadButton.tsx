import { Canvas, FabricObject } from "fabric";
import { Download, Trash2, Undo2, ClipboardPaste, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  canvas: Canvas | null;
};

function DownloadButton({ canvas }: Props) {
  const [history, setHistory] = useState<string[]>([]);
  const clipboard = useRef<FabricObject | null>(null);

  const downloadLogo = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });

    const link = document.createElement("a");
    link.download = `logo-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearCanvas = () => {
    if (!canvas) return;

    const objects = canvas.getObjects();

    objects.forEach((obj) => {
      canvas.remove(obj);
    });

    canvas.discardActiveObject();
    canvas.renderAll();
  };

  // const deleteSelected = () => {
  //   if (!canvas) return;
  //   const activeObject = canvas.getActiveObject();
  //   if (activeObject) {
  //     canvas.remove(activeObject);
  //     canvas.discardActiveObject();
  //     canvas.renderAll();
  //   }
  // };

  const saveHistory = () => {
    if (!canvas) return;
    setHistory((prev) => [...prev, JSON.stringify(canvas)]);
  };

  const undo = () => {
    if (!canvas) return;

    const objects = canvas.getObjects();

    if (objects.length === 0) return;

    const lastObject = objects[objects.length - 1];

    canvas.remove(lastObject);
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  // const copy = () => {
  //   if (!canvas) return;
  //   const activeObject = canvas.getActiveObject();
  //   if (activeObject) {
  //     activeObject.clone((cloned: FabricObject) => {
  //       clipboard.current = cloned;
  //     });
  //   }
  // };

  // const paste = () => {
  //   if (!canvas || !clipboard.current) return;

  //   clipboard.current.clone((clonedObj: FabricObject) => {
  //     canvas.discardActiveObject();
  //     clonedObj.set({
  //       left: (clonedObj.left || 0) + 20,
  //       top: (clonedObj.top || 0) + 20,
  //     });
  //     canvas.add(clonedObj);
  //     canvas.setActiveObject(clonedObj);
  //     canvas.renderAll();
  //   });
  // };

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (!canvas) return;

  //     if (e.key === "Delete") {
  //       deleteSelected();
  //     }

  //     if (e.ctrlKey && e.key.toLowerCase() === "z") {
  //       e.preventDefault();
  //       undo();
  //     }

  //     if (e.ctrlKey && e.key.toLowerCase() === "c") {
  //       e.preventDefault();
  //       copy();
  //     }

  //     if (e.ctrlKey && e.key.toLowerCase() === "v") {
  //       e.preventDefault();
  //       paste();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   if (canvas) {
  //     canvas.on("object:added", saveHistory);
  //     canvas.on("object:modified", saveHistory);
  //     canvas.on("object:removed", saveHistory);
  //   }

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [canvas, history]);

  return (
    <div className="flex items-center justify-center gap-4 px-4 py-2">
      {/* CENTER BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={clearCanvas}
          className="px-3 py-2  text-white text-xs rounded-lg  flex items-center gap-1"
        >
          <Trash2 size={14} />
          Clear
        </button>

        {/* <button
          onClick={deleteSelected}
          className="px-3 py-2  text-white text-xs rounded-lg  flex items-center gap-1"
        >
          <X size={14} />
          Delete
        </button> */}

        <button
          onClick={undo}
          className="px-3 py-2  text-white text-xs rounded-lg  flex items-center gap-1"
        >
          <Undo2 size={14} />
          Undo
        </button>

        {/* <button
          onClick={paste}
          className="px-3 py-2  text-white text-xs rounded-lg  flex items-center gap-1"
        >
          <ClipboardPaste size={14} />
          Paste
        </button> */}
      </div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={downloadLogo}
        className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 flex gap-2"
      >
        <Download size={16} />
        Download
      </button>
    </div>
  );
}

export default DownloadButton;
