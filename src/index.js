const path = require('path')
// Tasks
const tasks = require('./tasks/index')

const cwd = path.resolve(process.cwd())

/**
 * Execute a list of tasks
 *
 * @param {Array} tasks - a list of all tasks that will be executed
 */
const executeTasks = tasksIds => {
  const promises = tasks
    .filter(({ metas }) => tasksIds.includes(metas.id) || metas.alias.some(a => tasksIds.includes(a)))
    .map(task => task.execute({ cwd }))

  return Promise.allSettled(promises)
    .then(promisesStatus => promisesStatus.map(promiseStatus => promiseStatus.value))
}

const executeAllTasks = _ => {
  const allTasksIds = tasks.map(task => task.metas.id)
  return executeTasks(allTasksIds)
}

const getTasksMetas = _ => {
  return tasks.map(task => task.metas)
}

module.exports = {
  executeAllTasks,
  executeTasks,
  getTasksMetas
}
