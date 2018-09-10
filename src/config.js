require('dotenv').config();

const fs = require('fs');
const path = require('path');

const devToken = process.env.FIGMA_TOKEN;

const configFilePath = path.resolve('figmagick.config.json');
const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

module.exports = {
  figmaToken: devToken,
  ...config,
};
