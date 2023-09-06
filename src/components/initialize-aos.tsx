"use client";

import AOS from "aos";
import { useEffect } from "react";

import "aos/dist/aos.css";

export function InitializeAOS() {
  useEffect(() => {
    AOS.init({
      once: true,
    });

    return () => AOS.refresh();
  });

  return null;
}
