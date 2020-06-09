const path = require('path')
const fsExtra = require('fs-extra')
const { getProjectFile } = require('../../utils')

const taskResult = require('../../taskResult')()

const COMPONENTS_DIRECTORY_PATH = getProjectFile('./components')
const PAGES_DIRECTORY_PATH = getProjectFile('./pages')
const BLANK_PAGE_FILE_PATH = path.join(PAGES_DIRECTORY_PATH, 'index.vue')
const LAYOUTS_DIRECTORY_PATH = getProjectFile('./layouts')
const BLANK_LAYOUT_FILE_PATH = path.join(LAYOUTS_DIRECTORY_PATH, 'default.vue')

const BLANK_PAGE_TEMPLATE_PATH = path.resolve(__dirname, './templates/blank-page.vue')
const BLANK_LAYOUT_TEMPLATE_PATH = path.resolve(__dirname, './templates/blank-layout.vue')

const metas = {
  name: 'Create a blank project',
  id: 'blank-project',
  alias: ['bp'],
  description: 'Remove components and styles from layout and home page'
}

const execute = async () => {
  taskResult.addMetas(metas)

  // Remove all files in /components directory
  try {
    await fsExtra.emptyDir(COMPONENTS_DIRECTORY_PATH)
  } catch (_) {
    taskResult.addError('Error while cleaning components directory')
  }

  // Copy blank page to /pages directory
  try {
    await fsExtra.copy(BLANK_PAGE_TEMPLATE_PATH, BLANK_PAGE_FILE_PATH)
  } catch (_) {
    taskResult.addError(`Error while copying blank page component, to ${BLANK_PAGE_FILE_PATH}`)
  }

  // Copy blank layout to /layouts directory
  try {
    await fsExtra.copy(BLANK_LAYOUT_TEMPLATE_PATH, BLANK_LAYOUT_FILE_PATH)
  } catch (_) {
    taskResult.addError(`Error while copying blank layout component, to ${BLANK_LAYOUT_FILE_PATH}`)
  }

  return taskResult
}

module.exports = {
  metas,
  execute
}
