const { replaceInFile, getProjectFile } = require('../../utils')

const taskResult = require('../../taskResult')()

const metas = {
  name: 'Set loading false',
  id: 'loading-false',
  alias: ['lf'],
  description: 'Remove default loading bar by setting loading to false in nuxt.config.js'
}

const execute = async () => {
  taskResult.addMetas(metas)

  try {
    await replaceInFile(getProjectFile('./nuxt.config.js'), {
      search: "{ color: '#fff' }",
      replace: 'false'
    })
  } catch (err) {
    console.log('err:', err)
    taskResult.addError('Error while setting loading to false')
  }

  return taskResult
}

module.exports = {
  metas,
  execute
}
