import React, { useState } from "react";
import IconButtons from "./IconButtons";
import IconGrid from "./LucideIcons";
import Hugeicons from "./Hugeicons";
import EmojiPicker from "./Emoji";
import { loadSVGFromString, util, Textbox, Canvas } from "fabric";
import { renderToStaticMarkup } from "react-dom/server";
import { icons } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";

type Props = {
    canvas: Canvas | null
};

function LeftSidebar({canvas}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLibrary, setActiveLibrary] = useState<
    "all" | "hugeicons" | "lucide" | "emoji"
  >("all");

  
    const removeExistingIcon = () => {
      if (!canvas) return;
      const objects = canvas.getObjects();
      const existingIcon = objects.find((obj: any) => obj.id === "main-icon");
      if (existingIcon) {
        canvas.remove(existingIcon);
      }
    };
  
  const addIcon = (iconName: string) => {
    if (!canvas) return;

    const IconComponent = icons[iconName as keyof typeof icons];
    if (!IconComponent) return;

    const svgString = renderToStaticMarkup(<IconComponent color="white" />); // Set color in React component

    loadSVGFromString(svgString)
      .then(({ objects, options }) => {
        removeExistingIcon(); // Remove previous icon
        const validObjects = objects.filter((obj) => obj !== null);
        const obj = util.groupSVGElements(validObjects as any, options);
        obj.set({
          left: 250,
          top: 250,
          originX: "center",
          originY: "center",
          id: "main-icon", // Tag as main icon
        } as any); // Cast to any to avoid TS error on custom id property
        obj.scaleToWidth(100);

        // Ensure stroke is white for Lucide icons
        (obj as any).forEachObject((child: any) => {
          child.set({ stroke: "white" });
        });

        canvas.add(obj);
        canvas.renderAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addHugeIcon = (icon: any) => {
    if (!canvas) return;

    // Pass color to HugeiconsIcon if supported using style or prop
    const svgString = renderToStaticMarkup(
      <HugeiconsIcon icon={icon} color="white" />,
    );

    loadSVGFromString(svgString)
      .then(({ objects, options }) => {
        removeExistingIcon(); // Remove previous icon
        const validObjects = objects.filter((obj) => obj !== null);
        const obj = util.groupSVGElements(validObjects as any, options);
        obj.set({
          left: 250,
          top: 250,
          originX: "center",
          originY: "center",
          id: "main-icon",
        } as any);
        obj.scaleToWidth(100);

        // Explicitly set fill/stroke to white for children just in case
        (obj as any).forEachObject((child: any) => {
          if (child.fill && child.fill !== "none") child.set({ fill: "white" });
          if (child.stroke && child.stroke !== "none")
            child.set({ stroke: "white" });
        });

        canvas.add(obj);
        canvas.renderAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addEmoji = (emoji: string) => {
    if (!canvas) return;
    removeExistingIcon(); // Remove previous icon
    const text = new Textbox(emoji, {
      left: 250,
      top: 250,
      originX: "center",
      originY: "center",
      fontSize: 100,
      fill: "white", // Emoji might count as text color? actually emojis have their own colors usually.
      // Wait, standard emojis are colored by the font/system.
      // If user wants "white" emojis, they might mean monochrome.
      // But standard emojis (😀) are multi-colored.
      // Setting 'fill' on a Textbox with emoji usually doesn't change the emoji color in modern browsers/OS unless it's a monochrome symbol.
      // If the user wants "white color icon", they probably mean for the vector icons. Emojis might be an exception or they want them strictly white (which is hard for standard emojis).
      // I'll stick to setting 'id' for now.
      id: "main-icon",
    } as any);
    canvas.add(text);
    canvas.renderAll();
  };

  return (
    <div className="w-96 bg-zinc-950  p-4 flex flex-col h-[calc(100vh-6rem)] overflow-y-scroll thin-scrollbar sticky top-0">
      <div className="mb-4">
        <input
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-zinc-900 border border-white/10 rounded outline-none"
        />
      </div>

      <IconButtons
        activeLibrary={activeLibrary}
        setActiveLibrary={setActiveLibrary}
      />

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
              <div className="text-xs text-gray-400 mb-2 uppercase">Emoji</div>
              <EmojiPicker onSelect={addEmoji} />
            </div>
          </>
        )}

        {activeLibrary === "hugeicons" && <Hugeicons onSelect={addHugeIcon} />}

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
  );
}

export default LeftSidebar;
