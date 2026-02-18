"use client";
import DownloadButton from "@/components/DownloadButton";
import Editor from "@/components/Editor";
import Hero from "@/components/Hero";
import { Canvas } from "fabric";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  return (
    <>
      <DownloadButton canvas={canvas} />
      <Editor onCanvasReady={setCanvas} />
    </>
  );
}
