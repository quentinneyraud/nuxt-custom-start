const fsPromises = require('fs').promises
const path = require('path')

const taskResult = require('../taskResult')()

const relativePaths = [
  'assets/README.md',
  'components/README.md',
  'layouts/README.md',
  'middleware/README.md',
  'pages/README.md',
  'plugins/README.md',
  'static/README.md',
  'store/README.md',
  's/README.md',
  'a/README.md'
]

const metas = {
  name: 'Delete README',
  id: 'delete-readme',
  alias: ['d-r'],
  description: 'Delete Readme files'
}

const execute = async ({ cwd }) => {
  taskResult.addMetas(metas)

  const absolutePaths = relativePaths.map(relativePath => path.resolve(cwd, relativePath))

  const promisesStates = await Promise.allSettled(absolutePaths.map(fsPromises.unlink))

  promisesStates
    .forEach(promiseState => {
      if (promiseState.status === 'rejected') {
        const { code, path } = promiseState.reason
        if (code === 'ENOENT') {
          taskResult.addError(`Le fichier ${path} n'existe pas`)
        }
      }
    })

  return taskResult
}

module.exports = {
  metas,
  execute
}
