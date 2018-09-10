const {
  object, array, functional, colorConverter,
} = require('../utils');
const { parseStyleFromStyleType } = require('../core');

const captureStyleFromItem = array.map(({ name, value }) => ({
  name,
  effect: value.effects,
}));

const shadowCSS = ({
  offset: { x, y }, color, radius,
}) => {
  const {
    r, g, b, a,
  } = colorConverter.normalizeRGBA(color);
  return `${x}px ${y}px ${radius}px rgba(${r}, ${g}, ${b}, ${a})`;
};

const innerShadowCSS = effect => `inset ${shadowCSS(effect)}`;

const getCssFromEffects = (effects) => {
  const cssEffects = effects.reduce((acc, effect) => {
    switch (effect.type) {
      case 'INNER_SHADOW':
        return { ...acc, shadow: acc.shadow.concat(innerShadowCSS(effect)) };
      case 'DROP_SHADOW':
        return { ...acc, shadow: acc.shadow.concat(shadowCSS(effect)) };
      default:
        return acc;
    }
  }, { shadow: [] });

  return cssEffects.shadow.join(', ');
};

const formatOutput = object.transformObjectEntries(([key, value]) => ({
  [key]: getCssFromEffects(value),
}));

const loadEffects = functional.compose(
  formatOutput,
  object.arrayToKeyPair('name', 'effect'),
  captureStyleFromItem,
  parseStyleFromStyleType.bind(this, 'EFFECT'),
);

module.exports = {
  loadEffects,
};
