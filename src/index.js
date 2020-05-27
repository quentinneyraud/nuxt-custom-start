const path = require('path')
// Tasks
const deleteReadme = require('./tasks/delete-readmes')

const availableTasks = [deleteReadme]

const cwd = path.resolve(process.cwd())

/**
 * Execute a list of tasks
 *
 * @param {Array} tasks - a list of all tasks that will be executed
 */
const executeTasks = tasks => {
  const promises = availableTasks
    .filter(({ metas }) => tasks.includes(metas.id) || metas.alias.some(a => tasks.includes(a)))
    .map(task => task.execute({ cwd }))

  return Promise.all(promises)
}

const executeAllTasks = _ => {
  const allTasksIds = availableTasks.map(task => task.metas.id)
  return executeTasks(allTasksIds)
}

const getTasksMetas = _ => {
  return availableTasks.map(task => task.metas)
}

const logTasksMetas = _ => {
  getTasksMetas()
    .forEach(taskMeta => {
      console.log(taskMeta)
    })
}

module.exports = {
  executeAllTasks,
  executeTasks,
  getTasksMetas,
  logTasksMetas
}
