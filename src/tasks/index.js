const deleteReadme = require('./delete-readme-files')
const blankProject = require('./blank-project')
const installStylus = require('./install-stylus')
const gitignore = require('./gitignore')
const qstylus = require('./q-stylus')
const loadingFalse = require('./loading-false')

module.exports = [
  deleteReadme,
  blankProject,
  installStylus,
  qstylus,
  gitignore,
  loadingFalse
]
