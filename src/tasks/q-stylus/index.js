const { installPackages, addLineToFile, getProjectFile } = require('../../utils')
const path = require('path')
const fsExtra = require('fs-extra')

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

    await addLineToFile(getProjectFile('./nuxt.config.js'), `,
      /*
      ** Styles resources module
      */
      styleResources: {
        stylus: [
          '~assets/styles/shared/index.styl'
        ]
      }`, {
      afterLine: 52
    })

    await addLineToFile(getProjectFile('./nuxt.config.js'), "'@nuxtjs/style-resources',", {
      after: 'modules: ['
    })

    await addLineToFile(getProjectFile('./nuxt.config.js'), "'~assets/styles/global/index.styl',", {
      after: 'css: ['
    })

    await fsExtra.copy(path.resolve(__dirname, './templates/styles'), getProjectFile('./assets/styles'))
  } catch (err) {
    taskResult.addError('Error while install q-stylus package')
  }

  return taskResult
}

module.exports = {
  metas,
  execute
}
