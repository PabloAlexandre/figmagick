#!/usr/bin/env node

const axios = require('axios');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const config = require('./config');
const core = require('./core');
const parsers = require('./parsers');

const loadFigmaDocument = () => axios.get(`https://api.figma.com/v1/files/${config.fileId}`, {
  headers: {
    'X-FIGMA-TOKEN': config.figmaToken,
  },
});

const createFolder = () => mkdirp.sync(path.dirname(config.outPath));
const writeFile = data => fs.writeFileSync(config.outPath, JSON.stringify(data, null, 2), 'utf-8');

(async () => {
  const result = await loadFigmaDocument();
  const figmaDoc = result.data;

  const doc = core.getDocumentFromElementName(figmaDoc.document, config.tokenEntry);
  try {
    const tokens = parsers.parseAll({ ...figmaDoc, document: doc }, config);
    createFolder();
    writeFile(tokens);
    console.log(`Done. Your tokens has saved in ${path.resolve(config.outPath)}. Check now!`);
  } catch (err) {
    console.error('Sorry, something is wrong', err);
  }
})();
