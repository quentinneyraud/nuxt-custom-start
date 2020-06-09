const getFileContent = require('./get-file-content')
const writeFile = require('./write-file')
const execa = require('execa')

const escapeForRegex = str => {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

module.exports = async (filePath, data, { after, before, afterLine, beforeLine } = {}) => {
  const originalContent = await getFileContent(filePath)

  const modifiedContent = originalContent
    .split('\n')
    .reduce((modifiedLines, currentLine, index) => {
      const matchAfter = (after && currentLine.match(new RegExp(escapeForRegex(after)))) || (!!afterLine && afterLine === index)
      const matchBefore = (before && currentLine.match(new RegExp(escapeForRegex(before)))) || (!!beforeLine && beforeLine === index)

      matchBefore && modifiedLines.push(data)
      modifiedLines.push(currentLine)
      matchAfter && modifiedLines.push(data)

      return modifiedLines
    }, [])
    .join('\n')

  await writeFile(filePath, modifiedContent)

  // await execa.sync('npm', ['run', 'lint', '--', '--fix'])
}
