const fsExtra = require('fs-extra')

module.exports = async (source, destination) => {
  await fsExtra.copy(source, destination)
}
