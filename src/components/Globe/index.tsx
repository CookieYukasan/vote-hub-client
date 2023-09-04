"use client";

import { useEffect, useRef } from "react";
import { World } from "./world/world";

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const world = new World(containerRef.current);
    world.start();

    return () => {
      if (!containerRef.current) return;

      world.stop();
      containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <>
      <div ref={containerRef}></div>
    </>
  );
}
