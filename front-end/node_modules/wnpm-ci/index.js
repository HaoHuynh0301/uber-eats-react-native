const path = require('path')
const execa = require('execa')
const {compare, compareVersions} = require('./lib/version-comparator')
const packageHandler = require('./lib/package-handler')
const versionCalculations = require('./lib/version-calculations')
const writeGitHead = require('./lib/write-git-head')

async function maybeGetPackageInfo(pkgName, registryUrl) {
  try {
    const {stdout} = await execa(`npm view --registry=${registryUrl} --@wix:registry=${registryUrl} --cache-min=0 --json ${pkgName}`, {shell: true})
    return JSON.parse(stdout)
  } catch (e) {
    return null
  }
}

async function findPublishedVersionsOnAllRegistries(cwd, registries) {
  const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
  const unscopedPackageName = pkg.name.replace('@wix/', '')
  const scopedPackageName = `@wix/${unscopedPackageName}`

  if (!registries) {
    registries = ['https://npm.dev.wixpress.com/', 'https://registry.npmjs.org/']
  }

  const packageInfoPromises = []
  for (const registry of registries) {
    packageInfoPromises.push(maybeGetPackageInfo(scopedPackageName, registry))

    if (!registry.includes('registry.npmjs.org') ||
      (pkg.publishConfig && pkg.publishConfig.registry === 'https://registry.npmjs.org/')) {
      packageInfoPromises.push(maybeGetPackageInfo(unscopedPackageName, registry))
    }
  }

  const packagesInfo = (await Promise.all(packageInfoPromises)).filter(pkgInfo => !!pkgInfo)

  const versions = packagesInfo.reduce((acc, pkgInfo) => {
    const pkgVersions = normalizeVersions(pkgInfo.versions)
    return acc.concat(pkgVersions)
  }, [])

  const uniqueVersions = [...new Set(versions)]

  // This is just to report stats from all registries
  const currentPublishedVersion = versionCalculations.calculateCurrentPublished(pkg.version, uniqueVersions)
  console.log('currentPublishedVersion', currentPublishedVersion)
  packagesInfo.forEach(pkgInfo => {
    const registry = pkgInfo.dist.tarball.split('/').slice(0,3).join('/')
    console.log(`registry: ${registry} pkgName: ${pkgInfo.name}`)
  })

  return uniqueVersions
}

function normalizeVersions(versions) {
  if (!versions) {
    return []
  } else if (typeof versions === 'string') {
    return [versions]
  } else {
    return versions
  }
}

async function isSameAsPublished(registryVersions, options) {
  const pkg = await packageHandler.readPackageJson(path.join(options.cwd, 'package.json'))
  const localPackageVersion = pkg.version
  const currentPublishedVersion = versionCalculations.calculateCurrentPublished(localPackageVersion, registryVersions, options)

  if (!currentPublishedVersion) {
    return false
  }

  let isSame = false

  if (options.versionToCompare) {
    isSame = await compareVersions(options.cwd, options.versionToCompare, currentPublishedVersion, options)
  } else {
    isSame = await compare(options.cwd, currentPublishedVersion, options)
  }

  if (isSame) {
    return currentPublishedVersion
  } else {
    return false
  }
}

async function incrementVersionOfPackage(registryVersions, options) {
  const localPackageVersion = (await packageHandler.readPackageJson(path.join(options.cwd, 'package.json'))).version
  const nextVersion = versionCalculations.calculateNextVersionPackage(localPackageVersion, registryVersions, options)

  if (nextVersion !== localPackageVersion) {
    await writePackageVersion(nextVersion, options.cwd)
  }
  return nextVersion
}

async function writePackageVersion(version, cwd) {
  await execa(`npm version --no-git-tag-version ${version}`, {shell: true, cwd})
}

/**
 * @param {{shouldBumpMinor?:boolean, checkHashInPackageJson?:boolean, cwd?:string, registries?:string[]}} [options]
 * @returns {Promise<void>}
 */
async function prepareForRelease(options = {}) {
  options.cwd = options.cwd || process.cwd()
  options.registries = options.registries || ['https://npm.dev.wixpress.com/', 'https://registry.npmjs.org/']

  const pkg = await packageHandler.readPackageJson(path.join(options.cwd, 'package.json'))

  if (pkg.private) {
    console.log('No release because package is private')
  } else {
    await writeGitHead(options.cwd)

    if (process.env.DANGEROUSLY_FORCE_PKG_VERSION && (!process.env.DANGEROUSLY_FORCE_PKG_NAME || process.env.DANGEROUSLY_FORCE_PKG_NAME === pkg.name)) {
      console.log(`Forcing package ${pkg.name} version ${process.env.DANGEROUSLY_FORCE_PKG_VERSION}`)
      await writePackageVersion(process.env.DANGEROUSLY_FORCE_PKG_VERSION, options.cwd)
      return
    }

    const registryVersions = await findPublishedVersionsOnAllRegistries(options.cwd, options.registries)
    let currentPublishedVersion

    try {
      currentPublishedVersion = await isSameAsPublished(registryVersions, options)
    }
    catch (err) {
      console.log('An error has occurred while comparing current version to published version:')
      console.log(err.stack || err)
      console.log('Since comparing the versions has failed, a new version will still be released!')
      currentPublishedVersion = false
    }

    if (currentPublishedVersion) {
      pkg.private = true
      pkg.version = currentPublishedVersion
      await packageHandler.writePackageJson(path.join(options.cwd, 'package.json'), pkg)
      console.log('No release because similar tarball is already published')
    } else {
      await incrementVersionOfPackage(registryVersions, options)
    }
  }
}

module.exports = {
  prepareForRelease,
}
