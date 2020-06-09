const getFileContent = require('./get-file-content')
const writeFile = require('./write-file')

const escapeForRegex = str => {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

module.exports = async (filePath, { search, replace } = {}) => {
  const originalContent = await getFileContent(filePath)

  const modifiedContent = originalContent.replace(new RegExp(escapeForRegex(search)), replace)

  await writeFile(filePath, modifiedContent)
}
