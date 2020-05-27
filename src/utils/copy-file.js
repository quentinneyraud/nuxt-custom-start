const fsPromises = require('fs').promises

module.exports = async (sourceFile, destinationFile) => {
  await fsPromises.copyFile(sourceFile, destinationFile)
}
