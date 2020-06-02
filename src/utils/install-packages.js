const execa = require('execa')
const getPackageManager = require('./get-package-manager')

module.exports = async packages => {
  if (!packages) return false

  if (!Array.isArray(packages)) {
    packages = [packages]
  }

  const packageManager = await getPackageManager()
  const command = packageManager === 'yarn' ? 'add' : 'install'
  const flag = packageManager === 'yarn' ? '--dev' : '--save-dev'

  await execa(packageManager, [command, ...packages, flag])
}
