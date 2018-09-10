const { compose } = require('./functional');

const normalizeHex = hex => (hex.length < 2 ? `0${hex}` : hex);
const convertNumberToHex = n => Number(n).toString(16);

const numberToHex = compose(
  normalizeHex,
  convertNumberToHex,
);

const normalizeRGBA = ({
  r, g, b, a,
}) => ({
  r: Math.ceil(r * 255),
  g: Math.ceil(g * 255),
  b: Math.ceil(b * 255),
  a,
});

const RGBToHex = (RGBColor, isZeroOneScale = false) => {
  const color = isZeroOneScale ? normalizeRGBA(RGBColor) : RGBColor;

  const r = numberToHex(color.r);
  const g = numberToHex(color.g);
  const b = numberToHex(color.b);

  return `#${r}${g}${b}`;
};

module.exports = {
  normalizeRGBA,
  RGBToHex,
};
