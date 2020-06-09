const getFileContent = require('./get-file-content')
const writeFile = require('./write-file')

const escapeForRegex = str => {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

module.exports = async (filePath, data, { after, before } = {}) => {
  const originalContent = await getFileContent(filePath)

  const modifiedContent = originalContent
    .split('\n')
    .reduce((modifiedLines, currentLine) => {
      const matchAfter = after && currentLine.match(new RegExp(escapeForRegex(after)))
      const matchBefore = before && currentLine.match(new RegExp(escapeForRegex(before)))

      matchBefore && modifiedLines.push(data)
      modifiedLines.push(currentLine)
      matchAfter && modifiedLines.push(data)

      return modifiedLines
    }, [])
    .join('\n')

  await writeFile(filePath, modifiedContent)
}
