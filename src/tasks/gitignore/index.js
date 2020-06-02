const request = require('request')
const { getProjectFile, getPackageManager, writeFile } = require('../../utils')

const taskResult = require('../../taskResult')()

const GITIGNORE_FILES_PATH = getProjectFile('./.gitignore')

const getHeader = (text, size = 50, horizontalPadding = 8) => {
  const sideLength = Math.floor((size - text.length - horizontalPadding * 2) / 2)
  const ajust = size - text.length - sideLength * 2 - horizontalPadding * 2

  return `${'#'.repeat(size)}
${'#'.repeat(sideLength)}${' '.repeat(horizontalPadding * 2 + text.length + ajust)}${'#'.repeat(sideLength)}
${'#'.repeat(sideLength)}${' '.repeat(horizontalPadding)}${text}${' '.repeat(horizontalPadding + ajust)}${'#'.repeat(sideLength)}
${'#'.repeat(sideLength)}${' '.repeat(horizontalPadding * 2 + text.length + ajust)}${'#'.repeat(sideLength)}
${'#'.repeat(size)}`
}

const getGitIgnoreTypes = (requestedTypes = []) => {
  if (!Array.isArray(requestedTypes)) {
    requestedTypes = [requestedTypes]
  }

  const options = {
    json: true
  }

  return new Promise((resolve, reject) => {
    request('https://www.gitignore.io/api/list?format=json', options, (err, res, body) => {
      if (err) {
        reject(err)
      }

      const filteredTypes = Object.values(body)
        .filter(type => requestedTypes.includes(type.key))

      resolve(filteredTypes)
    })
  })
}

const metas = {
  name: 'Add rules to .gitignore file',
  id: 'gitignore',
  alias: ['gi'],
  description: 'Add rules to .gitignore with templates from Github/gitignore repository'
}

const execute = async () => {
  taskResult.addMetas(metas)

  try {
    const packageManager = await getPackageManager()
    const types = await getGitIgnoreTypes(['nuxt', 'nuxtjs', 'windows', 'linux', 'macos', 'visualstudiocode', 'sublimetext'])

    let text = ''

    // Custom header
    text += `${getHeader('CUSTOM')}\n\n`

    // Custom rules
    const packageManagerIgnore = packageManager === 'yarn' ? 'package-lock.json' : 'yarn.lock'
    text += `# VScode history plugin\n/.history\n\n`
    text += `# Package manager\n${packageManagerIgnore}\n\n`

    // From gitignore.io header
    text += `${getHeader('From Gitignore.io')}\n\n`

    text += types.reduce((acc, curr) => {
      acc += `${curr.contents}`

      return acc
    }, '')

    await writeFile(GITIGNORE_FILES_PATH, text)
  } catch (err) {
    taskResult.addError(err.message)
  }

  return taskResult
}

module.exports = {
  metas,
  execute
}
