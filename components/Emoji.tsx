import React, { useState, useEffect } from "react";
import emojiData from "emoji-datasource";

interface Emoji {
  char: string;
  name: string;
  category: string;
}

export default function EmojiPicker() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const formattedEmojis = emojiData.map((emoji) => ({
      char: emoji.unified
        .split("-")
        .map((c) => String.fromCodePoint(parseInt(c, 16)))
        .join(""),
      name: emoji.short_name,
      category: emoji.category,
    }));
    setEmojis(formattedEmojis);
  }, []);

  const filteredEmojis = emojis.filter((emoji) =>
    emoji.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="grid grid-cols-5 gap-3 ">
        {filteredEmojis.map((emoji, index) => (
          <button
            key={index}
            className="flex items-center justify-center p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 transition "
          >
            <span style={{ fontSize: "24px" }}>{emoji.char}</span>
            {/* <small>{emoji.name}</small> */}
          </button>
        ))}
      </div>
    </div>
  );
}
