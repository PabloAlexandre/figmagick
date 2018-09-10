const {
  object, array, functional,
} = require('../utils');
const { parseStyleFromStyleType } = require('../core');

const captureStyleFromItem = array.map(({ name, value }) => ({
  name,
  style: value.style,
}));

const formatOutput = object.transformObjectEntries(([key, value]) => ({
  [key]: object.extractProperties(
    'fontFamily',
    'fontSize',
    'fontWeight',
    'lineHeightPx',
    'letterSpacing',
  )(value),
}));

const loadFontStyles = functional.compose(
  formatOutput,
  object.arrayToKeyPair('name', 'style'),
  captureStyleFromItem,
  parseStyleFromStyleType.bind(this, 'TEXT'),
);

module.exports = {
  loadFontStyles,
};
