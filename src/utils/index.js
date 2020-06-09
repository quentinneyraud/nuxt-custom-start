const cleanDirectory = require('./clean-directory')
const getProjectFile = require('./get-project-file')
const copy = require('./copy')
const fileExists = require('./file-exists')
const installPackages = require('./install-packages')
const getFileContent = require('./get-file-content')
const writeFile = require('./write-file')
const getPackageManager = require('./get-package-manager')
const addLineToFile = require('./add-line-to-file')
const replaceInFile = require('./replace-in-file')

module.exports = {
  cleanDirectory,
  getProjectFile,
  copy,
  fileExists,
  installPackages,
  getFileContent,
  writeFile,
  getPackageManager,
  addLineToFile,
  replaceInFile
}
