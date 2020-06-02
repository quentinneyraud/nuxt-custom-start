const cleanDirectory = require('./clean-directory')
const getProjectFile = require('./get-project-file')
const copyFile = require('./copy-file')
const fileExists = require('./file-exists')
const installPackages = require('./install-packages')
const getFileContent = require('./get-file-content')
const writeFile = require('./write-file')
const getPackageManager = require('./get-package-manager')

module.exports = {
  cleanDirectory,
  getProjectFile,
  copyFile,
  fileExists,
  installPackages,
  getFileContent,
  writeFile,
  getPackageManager
}
