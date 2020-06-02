const fsPromises = require('fs').promises
const path = require('path')

/**
 * Remove all files from a directory
 *
 * @param {String} directoryPath - a list of all tasks that will be executed
 *
 * @returns {Promise} list of objects for each files with status and path keys
 */
module.exports = async directoryPath => {
  const files = await fsPromises.readdir(directoryPath)

  if (files.length === 0) return []

  const promises = files.map(file => {
    file = path.resolve(directoryPath, file)

    return fsPromises.unlink(file)
      .then(_ => file)
  })

  try {
    await Promise.all(promises)
    return true
  } catch (err) {
    return err
  }
}
