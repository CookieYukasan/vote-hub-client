import { WebGLRenderer } from "three";
import { canvasHeight, canvasWidth } from "./config";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: false, alpha: true });

  renderer.setPixelRatio(window.devicePixelRatio * 0.5);
  renderer.setSize(canvasWidth(), canvasHeight());
  renderer.setClearColor(0x000000, 0);

  return renderer;
}

export { createRenderer };
