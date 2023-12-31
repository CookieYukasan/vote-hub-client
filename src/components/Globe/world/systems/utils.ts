import TWEEN from "@tweenjs/tween.js";
import { Vector3 } from "three";

export function hexToRgb(hex: any) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(
    shorthandRegex,
    function (m: string, r: string, g: string, b: string) {
      return r + r + g + g + b + b;
    }
  );

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}

export function pointOfView(
  camera: any,
  controls: any,
  globe: any,
  geoCoords: any,
  transitionDuration = 0
) {
  const curGeoCoords = getGeoCoords();

  if (
    geoCoords.lat === undefined &&
    geoCoords.lng === undefined &&
    geoCoords.altitude === undefined
  ) {
    return curGeoCoords;
  } else {
    const finalGeoCoords = Object.assign({}, curGeoCoords, geoCoords);
    ["lat", "lng", "altitude"].forEach(
      (p) => (finalGeoCoords[p] = +finalGeoCoords[p])
    ); // coerce coords to number

    if (!transitionDuration) {
      setCameraPos(finalGeoCoords);
    } else {
      while (curGeoCoords.lng - finalGeoCoords.lng > 180)
        curGeoCoords.lng -= 360;
      while (curGeoCoords.lng - finalGeoCoords.lng < -180)
        curGeoCoords.lng += 360;

      new TWEEN.Tween(curGeoCoords)
        .to(finalGeoCoords, transitionDuration)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(setCameraPos)
        .start();
    }
  }

  function getGeoCoords() {
    return globe.toGeoCoords(cameraPosition());
  }

  function setCameraPos({ lat, lng, altitude }: any) {
    cameraPosition(globe.getCoords(lat, lng, altitude));
  }

  function cameraPosition(
    position?: any,
    lookAt?: any,
    transitionDuration?: any
  ) {
    if (position) {
      const finalPos = position;
      const finalLookAt = lookAt || { x: 0, y: 0, z: 0 };

      if (!transitionDuration) {
        setCameraPos(finalPos);
        setLookAt(finalLookAt);
      } else {
        const camPos = Object.assign({}, camera.position);
        const camLookAt = getLookAt();

        new TWEEN.Tween(camPos)
          .to(finalPos, transitionDuration)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(setCameraPos)
          .start();

        new TWEEN.Tween(camLookAt)
          .to(finalLookAt, transitionDuration / 3)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(setLookAt)
          .start();
      }
    }

    return Object.assign({}, camera.position, { lookAt: getLookAt() });

    //

    function setCameraPos(pos: any) {
      const { x, y, z } = pos;
      if (x !== undefined) camera.position.x = x;
      if (y !== undefined) camera.position.y = y;
      if (z !== undefined) camera.position.z = z;
    }

    function setLookAt(lookAt: any) {
      const lookAtVect = new Vector3(lookAt.x, lookAt.y, lookAt.z);
      if (controls.target) {
        controls.target = lookAtVect;
      } else {
        camera.lookAt(lookAtVect);
      }
    }

    function getLookAt() {
      return Object.assign(
        new Vector3(0, 0, -1000)
          .applyQuaternion(camera.quaternion)
          .add(camera.position)
      );
    }
  }
}
