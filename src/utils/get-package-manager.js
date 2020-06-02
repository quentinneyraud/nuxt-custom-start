const fileExists = require('./file-exists')
const getProjectFile = require('./get-project-file')

module.exports = async _ => {
  if (await fileExists(getProjectFile('./yarn.lock'))) {
    return 'yarn'
  } else {
    return 'npm'
  }
}
