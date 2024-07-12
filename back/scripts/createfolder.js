const fs = require('fs');
const path = require('path');

function createCategoryFolder(categoryName) {
  const dirPath = path.join(__dirname, '../notices', categoryName);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

module.exports = createCategoryFolder;
