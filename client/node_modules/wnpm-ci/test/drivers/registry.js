const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const waitPort = require('wait-port')
const tmp = require('tmp')

module.exports.aRegistryDriver = ({ port = 4873 } = {}) => {
  let verdaccioDir
  let verdaccioProcess

  const start = async () => {
    const verdaccioExecPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'verdaccio')
    const verdaccioConfig = 'verdaccio.yaml'

    verdaccioDir = tmp.dirSync({ unsafeCleanup: true })
    await fs.copyFile(path.join(__dirname, verdaccioConfig), path.join(verdaccioDir.name, verdaccioConfig))

    verdaccioProcess = execa(`${verdaccioExecPath} -l localhost:${port} -c ${path.join(verdaccioDir.name, verdaccioConfig)}`, { cwd: verdaccioDir.name, shell: true })
    await waitPort({ port })
  }

  const stop = () => {
    verdaccioProcess && verdaccioProcess.kill()
    verdaccioDir && verdaccioDir.removeCallback()
  }

  const getRegistryUrl = () => {
    return `http://localhost:${port}`
  }

  const putPackageInRegistry = async ({ packageName, version, checksum }) => {
    const dir = tmp.dirSync({ unsafeCleanup: true })
    const packageJson = {
      name: packageName,
      version,
      checksum,
      public: true
    }
    const npmRc = `//localhost:${port}/:_authToken=cm95IHNvbW1lciB3YXMgaGVyZQ==\n`

    await Promise.all([
      fs.writeFile(path.join(dir.name, 'package.json'), JSON.stringify(packageJson)),
      fs.writeFile(path.join(dir.name, '.npmrc'), npmRc)
    ])

    await execa(`npm publish --registry=http://localhost:${port}`, { cwd: dir.name, shell: true, stdio: 'inherit' })

    dir.removeCallback()
  }

  const fetchPackage = async ({ packageName, version }) => {
    const dir = tmp.dirSync({ unsafeCleanup: true })

    await execa(`npm pack --registry=http://localhost:${port} ${packageName}@${version}`, { cwd: dir.name, shell: true })
    await execa('tar -xf *.tgz', { cwd: dir.name, shell: true })

    return path.join(dir.name, 'package')
  }

  return {
    start,
    stop,
    getRegistryUrl,
    putPackageInRegistry,
    fetchPackage
  }
}
