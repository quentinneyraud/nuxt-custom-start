const path = require('path')
const { cleanDirectory, getProjectFile, copyFile } = require('../../utils')

const taskResult = require('../../taskResult')()

const COMPONENTS_DIRECTORY_PATH = getProjectFile('./components')
const PAGES_DIRECTORY_PATH = getProjectFile('./pages')
const LAYOUTS_DIRECTORY_PATH = getProjectFile('./layouts')

const BLANK_PAGE_TEMPLATE_PATH = path.resolve(__dirname, './template/blank-page.vue')
const BLANK_LAYOUT_TEMPLATE_PATH = path.resolve(__dirname, './template/blank-layout.vue')

const metas = {
  name: 'Create a blank project',
  id: 'blank-project',
  alias: ['bp'],
  description: 'Remove components and styles from layout and home page'
}

const execute = async () => {
  taskResult.addMetas(metas)

  await cleanDirectory(COMPONENTS_DIRECTORY_PATH)

  await copyFile(BLANK_PAGE_TEMPLATE_PATH, path.join(PAGES_DIRECTORY_PATH, 'index.vue'))
  await copyFile(BLANK_LAYOUT_TEMPLATE_PATH, path.join(LAYOUTS_DIRECTORY_PATH, 'default.vue'))

  return taskResult
}

module.exports = {
  metas,
  execute
}
