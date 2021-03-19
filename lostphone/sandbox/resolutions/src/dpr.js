const getDevicePixelRatio = () => {
  const params = new URLSearchParams(location.search);
  const forceDPR = params.get('dpr');
  if (forceDPR) {
    return Math.floor(parseInt(forceDPR));
  }
  return Math.floor(window.devicePixelRatio);
};

export const DPR = getDevicePixelRatio();
