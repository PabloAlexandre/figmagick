const {
  object, array, functional,
} = require('../utils');
const { getDocumentFromElementName, searchInTree } = require('../core');

const captureSizeFromItem = array.map(({ name, absoluteBoundingBox }) => ({
  name,
  size: absoluteBoundingBox.width,
}));

const getSpaceDocument = (data, group) => getDocumentFromElementName(data.document, group).children;

const loadSpacing = functional.compose(
  object.arrayToKeyPair('name', 'size'),
  captureSizeFromItem,
  searchInTree.bind(this, element => ['RECTANGLE', 'VECTOR'].includes(element.type)),
  getSpaceDocument,
);

module.exports = {
  loadSpacing,
};
