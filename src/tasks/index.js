const deleteReadme = require('./delete-readme-files')
const blankProject = require('./blank-project')
const installStylus = require('./install-stylus')
const gitignore = require('./gitignore')

module.exports = [
  deleteReadme,
  blankProject,
  installStylus,
  gitignore
]
