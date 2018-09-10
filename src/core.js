const searchInTree = (condition, iterableChildren) => iterableChildren.reduce((acc, element) => {
  if (condition(element)) {
    return [...acc, element];
  } if (element.children) {
    const childResults = searchInTree(condition, element.children);

    if (childResults) {
      return [...acc, ...childResults];
    }
  }
  return acc;
}, []);

const searchInTreeForStyles = (iterableChildren, styleType, id) => {
  const cond = element => element.styles && element.styles[styleType] === id;
  return searchInTree(cond, iterableChildren);
};

const parseStyleFromStyleType = (styleType, figmaData) => Object.entries(figmaData.styles)
  .filter(([key, value]) => value.styleType === styleType) //eslint-disable-line
  .map(([key, value]) => ({
    id: key,
    name: value.name,
    value:
    searchInTreeForStyles(figmaData.document.children, value.styleType.toLowerCase(), key)[0],
  }));

const getDocumentFromElementName = (figmaData, frameName) => figmaData.children
  .reduce((acc, element) => {
    if (element.name === frameName) {
      return element;
    } if (element.children && !acc) {
      const childResults = getDocumentFromElementName(element, frameName);

      if (childResults) {
        return childResults;
      }
    }

    return acc;
  }, null);

module.exports = {
  getDocumentFromElementName,
  searchInTree,
  searchInTreeForStyles,
  parseStyleFromStyleType,
};
