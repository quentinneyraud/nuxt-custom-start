const { name, version, description } = require('../../package.json')
const boxen = require('boxen')
const chalk = require('chalk')

// insert line break every 10 words
const formattedDescription = description
  .split(' ')
  .reduce((acc, curr, index) => {
    if (index > 0 && index % 10 === 0) {
      acc.push('\n')
    }

    acc.push(curr)

    return acc
  }, [])
  .join(' ')

module.exports = boxen(`${chalk.green(name)}  v${version}\n\n${formattedDescription}`, {
  padding: 2,
  borderStyle: 'single',
  align: 'center'
})
