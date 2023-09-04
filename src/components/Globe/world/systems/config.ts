const isMobile = window.innerWidth < 600;
const aspect = isMobile ? 0.9 : 1.2;
const cameraZ = 300;
const canvasWidth = () => {
  return isMobile ? window.innerWidth : window.innerWidth / 2;
};
const canvasHeight = () => canvasWidth() / aspect;

export { aspect, cameraZ, canvasHeight, canvasWidth };
