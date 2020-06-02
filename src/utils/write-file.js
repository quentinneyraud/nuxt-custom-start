const fsPromises = require('fs').promises

module.exports = async (filePath, content) => {
  await fsPromises.writeFile(filePath, content, {
    encoding: 'utf8'
  })
}
