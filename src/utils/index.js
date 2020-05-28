const cleanDirectory = require('./clean-directory')
const getProjectFile = require('./get-project-file')
const copyFile = require('./copy-file')
const fileExists = require('./file-exists')
const installPackages = require('./install-packages')

module.exports = {
  cleanDirectory,
  getProjectFile,
  copyFile,
  fileExists,
  installPackages
}
