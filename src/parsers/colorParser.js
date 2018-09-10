const { parseStyleFromStyleType } = require('../core');
const {
  colorConverter, object, array, functional,
} = require('../utils');

const getGradientLinear = (element) => {
  const { gradientHandlePositions: points, gradientStops: stops } = element;
  const zeroPercentagePositionX = Math.max(Math.sign(points[0].x - points[1].x), 0);

  const fullInitialPercentage = Math.abs(zeroPercentagePositionX - points[0].x) * 100;
  const fullFinalPercentage = Math.abs(zeroPercentagePositionX - points[1].x) * 100;

  const getStepPercentage = percentage => Math.abs(fullInitialPercentage - fullFinalPercentage)
  * percentage;

  const gradientSteps = stops.map(({
    color, position,
  }) => {
    const {
      r, g, b, a,
    } = colorConverter.normalizeRGBA(color);
    return `rgba(${r}, ${g}, ${b}, ${a}) ${getStepPercentage(position)}%`;
  });

  const gradientAngle = (Math.atan2(points[1].y - points[0].y, points[1].x - points[0].x)
  * 180 / Math.PI) + 90;

  return `linear-gradient(${gradientAngle}deg, ${gradientSteps.join(', ')});`;
};

const setColorFromElement = (element) => {
  switch (element.type) {
    case 'SOLID':
      return colorConverter.RGBToHex(element.color, true);
    case 'GRADIENT_LINEAR':
      return getGradientLinear(element);
    default:
      return '';
  }
};
const captureColorFromItem = array.map(({ name, value }) => ({
  name,
  color: value && setColorFromElement(value.fills[0]),
}));

const loadColors = functional.compose(
  object.arrayToKeyPair('name', 'color'),
  arr => arr.filter(it => it.color),
  captureColorFromItem,
  parseStyleFromStyleType.bind(this, 'FILL'),
);

module.exports = {
  loadColors,
};
