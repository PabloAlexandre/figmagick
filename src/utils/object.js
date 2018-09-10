const arrayToKeyPair = (keyProperty, valueProperty) => arr => arr
  .reduce((acc, item) => ({
    ...acc,
    [item[keyProperty]]: item[valueProperty],
  }), {});

const transformObjectEntries = iterator => obj => Object.entries(obj)
  .reduce((acc, [key, value]) => ({
    ...acc,
    ...iterator([key, value]),
  }), {});

const extractProperties = (...props) => obj => props.reduce((acc, it) => ({
  ...acc,
  [it]: obj[it],
}), {});

module.exports = {
  arrayToKeyPair,
  transformObjectEntries,
  extractProperties,
};
