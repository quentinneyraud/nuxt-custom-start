const fsPromises = require('fs').promises
const { getProjectFile } = require('../../utils')

const taskResult = require('../../taskResult')()

const README_FILES_PATHS = [
  getProjectFile('./assets/README.md'),
  getProjectFile('./components/README.md'),
  getProjectFile('./layouts/README.md'),
  getProjectFile('./middleware/README.md'),
  getProjectFile('./pages/README.md'),
  getProjectFile('./plugins/README.md'),
  getProjectFile('./static/README.md'),
  getProjectFile('./store/README.md')
]

const metas = {
  name: 'Delete README',
  id: 'delete-readme-files',
  alias: ['drf'],
  description: 'Delete Readme files in sub folders, keeping the one at the root'
}

const execute = async () => {
  taskResult.addMetas(metas)

  const promisesStates = await Promise.allSettled(README_FILES_PATHS.map(filePath => fsPromises.unlink(filePath)))

  promisesStates
    .forEach(promiseState => {
      if (promiseState.status === 'rejected') {
        const { code, message } = promiseState.reason
        if (code !== 'ENOENT') {
          taskResult.addError(message)
        }
      }
    })

  return taskResult
}

module.exports = {
  metas,
  execute
}
