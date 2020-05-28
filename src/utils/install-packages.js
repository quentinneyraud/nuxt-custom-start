const execa = require('execa')
const fileExists = require('./file-exists')
const getProjectFile = require('./get-project-file')

module.exports = async packages => {
  if (!packages) return false

  if (!Array.isArray(packages)) {
    packages = [packages]
  }

  const useYarn = await fileExists(getProjectFile('./yarn.lock'))
  const packageManager = useYarn ? 'yarn' : 'npm'
  const command = useYarn ? 'add' : 'install'
  const flag = useYarn ? '--dev' : '--save-dev'

  await execa(packageManager, [command, ...packages, flag])
}
