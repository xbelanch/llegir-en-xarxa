// set game width and height by multiplying window width with devicePixelRatio

var w = window.innerWidth;
var h = window.innerHeight;
var pxr = window.devicePixelRatio;

console.log('w: ' + w + ' h: ' + h + ' pxr: ' + pxr);

if (w > h) {
  w = h * 0.6 * pxr;
}

export const width = w * pxr;
export const height = h * pxr;
export const dpr = pxr;
