"use client";

import { useEffect, useRef } from "react";
import { World } from "./world/world";

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let world: any = null;
    let started = false;

    function scrollHandler() {
      if (!containerRef.current) return;
      const isVisible =
        containerRef.current.getBoundingClientRect().top - 100 <
        window.innerHeight;

      if (isVisible && !started) {
        world = new World(containerRef.current);
        started = true;
        world.start();
      }
    }

    window.addEventListener("scroll", scrollHandler);

    return () => {
      if (!containerRef.current) return;

      window.removeEventListener("scroll", scrollHandler);

      if (world) world.stop();
    };
  }, []);

  return (
    <>
      <div ref={containerRef}></div>
    </>
  );
}
