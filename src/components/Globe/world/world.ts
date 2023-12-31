import { createCamera } from "./components/camera";
import { Globe } from "./components/globe";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";
import { createControls } from "./systems/controls";
import { Loop } from "./systems/loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/resizer";
import { pointOfView } from "./systems/utils";

let camera: any;
let controls: any;
let renderer: any;
let scene: any;
let loop: any;
let globe: any;

class World {
  constructor(container: any) {
    renderer = createRenderer();
    scene = createScene();
    camera = createCamera();

    loop = new Loop(camera, scene, renderer);
    controls = createControls(camera, renderer.domElement);
    controls.update();
    loop.updatables.push(controls);

    const { ambientLight, dLight, dLight1, dLight2 } = createLights();
    camera.add(ambientLight, dLight, dLight1, dLight2);

    globe = new Globe();
    globe.init();
    loop.updatables.push(globe.instance);

    scene.add(camera, globe.instance);

    pointOfView(
      camera,
      controls,
      globe.instance,
      { lat: 22.3193, lng: 114.1694 },
      1000
    ); // China HongKong

    const resizer = new Resizer(camera, renderer);

    container.append(renderer.domElement);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
