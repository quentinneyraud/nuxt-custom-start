#!/usr/bin/env node

/* eslint-disable no-console */
const { executeAllTasks, executeTasks, getTasksMetas } = require('../src/index')
const { projectBox } = require('../src/output')
const meow = require('meow')
const chalk = require('chalk')
const inquirer = require('inquirer')

const COMMANDS = ['run', 'run-all', 'view']

const cliExecution = meow(`
${projectBox}

    Usage
      $ nuxt-custom-start command

    Commands
      run - Run tasks specified by tasks flag or let you choose tasks with checkboxes
      run-all - Run all tasks
      view - Logs a list of all available tasks

    Options
      --tasks, -t  Only execute some tasks

    Examples
      $ nuxt-custom-start run
      $ nuxt-custom-start run --tasks delete-readme
      $ nuxt-custom-start view
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

// Show help on unknown command
if (!COMMANDS.includes(cliExecution.input[0])) {
  cliExecution.showHelp()
}

const command = cliExecution.input[0]

if (command === 'view') {
  console.log()
  console.log('List of tasks :')

  getTasksMetas()
    .forEach(meta => {
      console.log()
      console.log('#'.repeat(50))
      console.log()
      console.log(chalk.bold(meta.name))
      console.log(meta.description)
      console.log()
      console.log('ID: ', meta.id)
      console.log('Alias: ', meta.alias.join(' '))
    })
  console.log()
  console.log('#'.repeat(50))
  process.exit(1)
}

if (command === 'run-all') {
  executeAllTasks()
    .then(tasksResults => {
      tasksResults
        .forEach(taskResult => {
          console.log(`${taskResult.hasErrors() ? chalk.red('✘') : chalk.green('✔')} ${taskResult.metas.name}`)

          if (taskResult.hasErrors()) {
            console.log()
            taskResult.errors.forEach(error => {
              console.log(chalk.red(error))
            })
            console.log()
          }
        })
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
