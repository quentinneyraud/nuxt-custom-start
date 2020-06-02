const fsPromises = require('fs').promises

module.exports = async filePath => {
  const content = await fsPromises.readFile(filePath, {
    encoding: 'utf8'
  })

  return content
}
