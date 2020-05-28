const { installPackages } = require('../../utils')

const taskResult = require('../../taskResult')()

const metas = {
  name: 'Install stylus',
  id: 'install-stylus',
  alias: ['is'],
  description: 'Install stylus and stylus-loader packages'
}

const execute = async () => {
  taskResult.addMetas(metas)

  await installPackages(['stylus', 'stylus-loader'])

  return taskResult
}

module.exports = {
  metas,
  execute
}
