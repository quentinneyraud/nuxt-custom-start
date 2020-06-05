const { installPackages, addLineToFile, getProjectFile } = require('../../utils')

const taskResult = require('../../taskResult')()

const metas = {
  name: 'Setup q-stylus',
  id: 'setup-q-stylus',
  alias: ['sqs'],
  description: 'Install @qneyraud/q-stylus libary, @nuxtjs/style-resources and create assets/styles base files'
}

const execute = async () => {
  taskResult.addMetas(metas)

  try {
    await installPackages(['@qneyraud/q-stylus', '@nuxtjs/style-resources'])

    await addLineToFile(getProjectFile('./nuxt.config.js'), "    '@nuxtjs/style-resources',", {
      after: 'modules: ['
    })
  } catch (err) {
    console.log('err:', err)
    taskResult.addError('Error while install q-stylus package')
  }

  return taskResult
}

module.exports = {
  metas,
  execute
}
