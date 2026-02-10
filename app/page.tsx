"use client";
import Hero from "@/components/Hero";
import { Canvas } from "fabric";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // const canvasRef = useRef(null);
  // const [canvas, setCanvas] = useState(null);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const initCanvas = new Canvas(canvasRef.current, {
  //       width: 500,
  //       height: 500
  //     });

  //     initCanvas.backgroundColor = "#fff";
  //     initCanvas.renderAll();
  //     setCanvas(initCanvas);
  //     return () => {
  //       initCanvas.dispose();
  //     };
  //   }
  // }, []);

  return (
   <Hero />
  );
}
