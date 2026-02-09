// affichage pour verification si les models sont importé ou update

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const modelsPath = __dirname;

fs.readdirSync(modelsPath)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => require(path.join(modelsPath, file)));

console.log('📦 Models importés :', mongoose.modelNames()); // <-- ici tu dois voir 'Admin', 'User', etc.
