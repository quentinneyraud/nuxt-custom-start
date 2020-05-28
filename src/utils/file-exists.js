const fsPromises = require('fs').promises

module.exports = async filePath => {
  try {
    await fsPromises.stat(filePath)
    return true
  } catch (_) {
    return false
  }
}
