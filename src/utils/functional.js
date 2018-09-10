const compose = (...args) => args.reduce((acc, it) => (...params) => acc(it(...params)));

module.exports = {
  compose,
};
