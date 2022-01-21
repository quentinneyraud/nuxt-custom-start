#!/usr/bin/env node
/* eslint-disable no-console */
const { executeAllTasks, executeTasks, getTasksMetas } = require('../src/index')
const { projectBox, blankLine, separator } = require('../src/output')
const meow = require('meow')
const chalk = require('chalk')
const inquirer = require('inquirer')

// Bin name
const BIN_NAME = 'nuxt-custom-start'

// Available commands
const COMMANDS = [{
  scope: 'task',
  actions: ['run', 'run-all', 'list']
}, {
  scope: 'feature',
  actions: ['add', 'list']
}]

const cliExecution = meow(`
${projectBox}

    ${chalk.bold('Usage')}
      $ ${chalk.cyan(BIN_NAME)} ${chalk.magenta('command')}

    ${chalk.bold('Commands')}
      ${chalk.magenta('task run')} - Run a list of tasks. If no tasks are specified, let you choose tasks with checkboxes
      ${chalk.magenta('task run-all')} - Run all tasks
      ${chalk.magenta('task list')} - List all tasks and informations about what they do

      ${chalk.magenta('feature add')} - Add a list of features. If no features are specified, let you choose features with checkboxes
      ${chalk.magenta('feature list')} - List all features and informations about what they do

    ${chalk.bold('Examples')}
      $ ${chalk.cyan(BIN_NAME)} ${chalk.magenta('task run')}                                  Display a checkbox list of all tasks
      $ ${chalk.cyan(BIN_NAME)} ${chalk.magenta('task run')} delete-readme                    Delete all README files
      $ ${chalk.cyan(BIN_NAME)} ${chalk.magenta('task run')} delete-readme blank-project      Delete all README files and remove base components
      $ ${chalk.cyan(BIN_NAME)} ${chalk.magenta('task run-all')}                              Run all tasks
      $ ${chalk.cyan(BIN_NAME)} ${chalk.magenta('task list')}                                 List tasks

      $ ${chalk.cyan(BIN_NAME)} ${chalk.magenta('feature add')}                               Display a checkbox list of all features
      $ ${chalk.cyan(BIN_NAME)} ${chalk.magenta('feature add')} virtual-scroll                Add virtual-scroll files and config to the project
      $ ${chalk.cyan(BIN_NAME)} ${chalk.magenta('feature list')}                              List features
`, {
  description: false,
  flags: {
    tasks: {
      type: 'string',
      alias: 't'
    }
  }
})

// Show help if -h flag is present
if (cliExecution.flags.h) {
  cliExecution.showHelp()
}

// Show version if -v flag is present
if (cliExecution.flags.v) {
  cliExecution.showVersion()
}

let commandScope = null
let action = null

COMMANDS
  .forEach(command => {
    if (cliExecution.input[0] === command.scope) {
      commandScope = command.scope

      if (command.actions.includes(cliExecution.input[1])) {
        action = cliExecution.input[1]
      }
    }
  })

// Show help on unknown command
if (!commandScope || !action) {
  cliExecution.showHelp()
}

// if (command === 'view') {
//   blankLine()
//   console.log('List of tasks :')

//   getTasksMetas()
//     .forEach(meta => {
//       blankLine()
//       separator()
//       blankLine()
//       console.log(chalk.bold(meta.name))
//       console.log(meta.description)
//       blankLine()
//       console.log('ID: ', meta.id)
//       console.log('Alias: ', meta.alias.join(' '))
//     })
//   blankLine()
//   separator()
//   process.exit(1)
// }

// if (command === 'run-all') {
//   executeAllTasks()
//     .then(tasksResults => {
//       tasksResults
//         .forEach(taskResult => {
//           console.log(`${taskResult.hasErrors() ? chalk.red('✘') : chalk.green('✔')} ${taskResult.metas.name}`)

//           if (taskResult.hasErrors()) {
//             blankLine()
//             taskResult.errors.forEach(error => {
//               console.log(chalk.red(error))
//             })
//             blankLine()
//           }
//         })
//       process.exit(0)
//     })
// }

// if (command === 'run') {
//   const hasTasksFlag = cliExecution.flags && cliExecution.flags.tasks && cliExecution.flags.tasks.length > 0

//   if (hasTasksFlag) {
//     const tasks = cliExecution.flags.tasks.split(',').filter(task => !!task)
//     executeTasks(tasks)
//       .then(result => {
//         console.log('All done')
//         process.exit(0)
//       })
//   } else {
//     const tasksChoices = getTasksMetas().map(taskMeta => ({
//       name: taskMeta.name,
//       value: taskMeta.id,
//       checked: true
//     }))

//     inquirer
//       .prompt([{
//         type: 'checkbox',
//         name: 'tasks',
//         choices: tasksChoices
//       }])
//       .then(answers => {
//         executeTasks(answers.tasks)
//           .then(result => {
//             console.log('All done')
//             process.exit(0)
//           })
//       })
//   }
// }
