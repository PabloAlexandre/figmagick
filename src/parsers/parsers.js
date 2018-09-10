const colorParser = require('./colorParser');
const fontParser = require('./fontParser');
const effectParser = require('./effectParser');
const spaceParser = require('./spaceParser');

const parseAll = (document, config) => ({
  colors: colorParser.loadColors(document),
  fonts: fontParser.loadFontStyles(document),
  effects: effectParser.loadEffects(document),
  spacing: spaceParser.loadSpacing(document, config.spaceGroup),
});

module.exports = {
  parseAll,
};
