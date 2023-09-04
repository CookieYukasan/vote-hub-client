import { Color } from "three";
import ThreeGlobe from "three-globe";
import arcsData from "../assets/arcs-data.json";
import countries from "../assets/globe-min.json";
import { genRandomNumbers, hexToRgb } from "../systems/utils";

const ARC_REL_LEN = 0.9; // relative to whole arc
const FLIGHT_TIME = 2000;
const NUM_RINGS = 1;
const RINGS_MAX_R = 3; // deg
const RING_PROPAGATION_SPEED = 3; // deg/sec

const interval = 2;
let deltaGlobe = 0;
let numbersOfRings: any = 0;

class Globe {
  instance: any;
  pointsData: any;

  constructor() {
    this.instance = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    });
    this.pointsData = [];

    this._buildData();
    this._buildMaterial();

    this.instance.tick = (delta: any) => this.tick(delta);
  }

  init() {
    this.initCountries(1000);
    this.initAnimationData(1000);
  }

  initCountries(delay: any) {
    setTimeout(() => {
      this.instance
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(true)
        .atmosphereColor("#ffffff")
        .atmosphereAltitude(0.1)
        .hexPolygonColor((e: any) => {
          return "rgba(255,255,255, 0.7)";
        });
    }, delay);
  }

  initAnimationData(delay: any) {
    setTimeout(() => {
      this.instance
        .arcsData(arcsData.flights)
        .arcStartLat((d: any) => d.startLat * 1)
        .arcStartLng((d: any) => d.startLng * 1)
        .arcEndLat((d: any) => d.endLat * 1)
        .arcEndLng((d: any) => d.endLng * 1)
        .arcColor((e: any) => e.color)
        .arcAltitude((e: any) => {
          return e.arcAlt * 1;
        })
        .arcStroke((e: any) => {
          return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)];
        })
        .arcDashLength(ARC_REL_LEN)
        .arcDashInitialGap((e: any) => e.order * 1)
        .arcDashGap(15)
        .arcDashAnimateTime((e: any) => FLIGHT_TIME)
        .pointsData(this.pointsData)
        .pointColor((e: any) => e.color)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(0.25)
        .ringsData([])
        .ringColor((e: any) => (t: any) => e.color(t))
        .ringMaxRadius(RINGS_MAX_R)
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod((FLIGHT_TIME * ARC_REL_LEN) / NUM_RINGS);
    }, delay);
  }

  tick(delta: any) {
    deltaGlobe += delta;

    if (deltaGlobe > interval) {
      numbersOfRings = genRandomNumbers(
        0,
        this.pointsData.length,
        Math.floor((this.pointsData.length * 4) / 5)
      );
      this.instance.ringsData(
        this.pointsData.filter((d: any, i: any) => numbersOfRings.includes(i))
      );

      deltaGlobe = deltaGlobe % interval;
    }
  }

  _buildData() {
    const arcs = arcsData.flights;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb: any = hexToRgb(arc.color);
      points.push({
        size: 1.0,
        order: arc.order,
        color: (t: any) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        label: arc.from,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: 1.0,
        order: arc.order,
        color: (t: any) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        label: arc.to,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }
    this.pointsData = points.filter(
      (v: any, i, a) =>
        a.findIndex((v2: any) =>
          ["lat", "lng"].every((k: any) => v2[k] === v[k])
        ) === i
    );
  }

  _buildMaterial() {
    const globeMaterial = this.instance.globeMaterial();
    globeMaterial.color = new Color("#000");
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.9;
  }
}

export { Globe };
