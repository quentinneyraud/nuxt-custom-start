#!/usr/bin/env node
const { executeAllTasks, executeTasks, getTasksMetas, logTasksMetas } = require('../src/index')

const meow = require('meow')
const inquirer = require('inquirer')
const COMMANDS = ['run', 'run-all', 'view']

const cliExecution = meow(`
    Usage
      $ nuxt-custom-start command

    Commands
      run - Run all tasks
      run-all - Run all tasks
      view - Display a list of all available tasks

    Options
      --tasks, -t  Only execute some tasks

    Examples
      $ nuxt-custom-start run
      $ nuxt-custom-start run --tasks delete-readme
      $ nuxt-custom-start view
`, {
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

// Show help on unknown command
if (!COMMANDS.includes(cliExecution.input[0])) {
  cliExecution.showHelp()
}

const command = cliExecution.input[0]

if (command === 'view') {
  logTasksMetas()
  process.exit(1)
}

if (command === 'run-all') {
  executeAllTasks()
    .then(tasksResults => {
      tasksResults
        .forEach(taskResult => taskResult.log())
      process.exit(0)
    })
}

if (command === 'run') {
  const hasTasksFlag = cliExecution.flags && cliExecution.flags.tasks && cliExecution.flags.tasks.length > 0

  if (hasTasksFlag) {
    const tasks = cliExecution.flags.tasks.split(',').filter(task => !!task)
    executeTasks(tasks)
      .then(result => {
        console.log('All done')
        process.exit(0)
      })
  } else {
    const tasksChoices = getTasksMetas().map(taskMeta => ({
      name: taskMeta.name,
      value: taskMeta.id,
      checked: true
    }))

    inquirer
      .prompt([{
        type: 'checkbox',
        name: 'tasks',
        choices: tasksChoices
      }])
      .then(answers => {
        executeTasks(answers.tasks)
          .then(result => {
            console.log('All done')
            process.exit(0)
          })
      })
  }
}
