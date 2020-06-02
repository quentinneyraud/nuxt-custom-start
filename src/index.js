const path = require('path')
// Tasks
const deleteReadme = require('./tasks/delete-readme-files')
const blankProject = require('./tasks/blank-project')
const installStylus = require('./tasks/install-stylus')
const gitignore = require('./tasks/gitignore')

const availableTasks = [deleteReadme, blankProject, installStylus, gitignore]

const cwd = path.resolve(process.cwd())

/**
 * Execute a list of tasks
 *
 * @param {Array} tasks - a list of all tasks that will be executed
 */
const executeTasks = async tasks => {
  const promises = availableTasks
    .filter(({ metas }) => tasks.includes(metas.id) || metas.alias.some(a => tasks.includes(a)))
    .map(task => task.execute({ cwd }))

  await Promise.all(promises)
}

const executeAllTasks = async _ => {
  const allTasksIds = availableTasks.map(task => task.metas.id)
  await executeTasks(allTasksIds)
}

const getTasksMetas = _ => {
  return availableTasks.map(task => task.metas)
}

module.exports = {
  executeAllTasks,
  executeTasks,
  getTasksMetas
}
