const path = require('path')
const {expect} = require('chai')
const {execSync} = require('child_process')
const {prepareForRelease} = require('../index')
const versionFetcher = require('../lib/version-fetcher')
const packageHandler = require('../lib/package-handler')
const {aRegistryDriver} = require('./drivers/registry')
const { writeFile } = require('fs-extra')

describe('wnpm-release', () => {

  it('should not release a new version if same tarball is published', async () => {
    const latest = execSync('npm view . dist-tags.latest').toString().trim()
    const cwd = await versionFetcher.fetch('wnpm-ci', latest)
    await prepareForRelease({cwd})

    const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
    expect(pkg.private).to.equal(true)
    expect(pkg.version).to.equal(latest)
  })

  it('should bump patch by default', async () => {
    const cwd = await versionFetcher.fetch('wnpm-ci', '6.2.0')
    await prepareForRelease({cwd})

    const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
    expect(pkg.private).to.equal(undefined)
    expect(pkg.version).to.not.equal('6.2.0')
    expect(pkg.version).to.contain('6.2.')
  })

  it('should bump minor', async () => {
    const cwd = await versionFetcher.fetch('wnpm-ci', '6.2.0')
    await prepareForRelease({cwd, shouldBumpMinor: true})

    const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
    expect(pkg.private).to.equal(undefined)
    expect(pkg.version).to.not.equal('6.2.0')
    expect(pkg.version).to.contain('6.3.')
  })

  it('should not touch version if it was modifier manually', async () => {
    const cwd = await versionFetcher.fetch('wnpm-ci', '6.2.0')
    execSync('npm version --no-git-tag-version 6.5.0', {cwd})
    await prepareForRelease({cwd, shouldBumpMinor: true})

    const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
    expect(pkg.private).to.equal(undefined)
    expect(pkg.version).to.equal('6.5.0')
  })

  it('should support initial publish of new package', async () => {
    const cwd = await versionFetcher.fetch('wnpm-ci', '6.2.0')
    const json = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
    await packageHandler.writePackageJson(path.join(cwd, 'package.json'), {...json, name: 'wnpm-kukuriku'})
    await prepareForRelease({cwd, shouldBumpMinor: true})

    const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
    expect(pkg.private).to.equal(undefined)
    expect(pkg.version).to.equal('6.2.0')
  })

  it('should bump version if comparing to published version fails', async () => {
    const cwd = await versionFetcher.fetch('wnpm-ci', '6.2.0')
    const originalFetch = versionFetcher.fetch
    versionFetcher.fetch = () => Promise.reject(new Error('Failed!'))
    await prepareForRelease({cwd})
    versionFetcher.fetch = originalFetch

    const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
    expect(pkg.private).to.equal(undefined)
    expect(pkg.version).to.not.equal('6.2.0')
    expect(pkg.version).to.contain('6.2.')
  })

  describe('with comparing to a published version (with http url)', () => {
    it('should not bump a version when comparing lastest to the matching version', async () => {
      const cwd = await versionFetcher.fetch('tmp.xsb6m4j2', '1.0.0')
      await prepareForRelease({ cwd, versionToCompare: 'https://registry.npmjs.org/tmp.xsb6m4j2/-/tmp.xsb6m4j2-1.0.0-same.tgz'})

      const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
      expect(pkg.private).to.equal(true)
    })

    it('should bump a version when comparing lastest to a non matching version', async () => {
      const cwd = await versionFetcher.fetch('tmp.xsb6m4j2', '1.0.0')
      await prepareForRelease({ cwd, versionToCompare: 'https://registry.npmjs.org/tmp.xsb6m4j2/-/tmp.xsb6m4j2-1.0.0-not-same.tgz'})

      const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
      expect(pkg.private).to.equal(undefined)
      expect(pkg.version).to.equal('1.0.1')
    })

    describe('with preCompareEdits', () => {
      it('should not bump a version when edits make the content the same', async () => {
        const cwd = await versionFetcher.fetch('tmp.xsb6m4j2', '1.0.0')
        await prepareForRelease({
          cwd, versionToCompare: 'https://registry.npmjs.org/tmp.xsb6m4j2/-/tmp.xsb6m4j2-1.0.0-not-same.tgz', preCompareEdits: async (pathA, pathB) => {
            await writeFile(path.join(pathA, 'aTestForWnpmCI'), '5')
            await writeFile(path.join(pathB, 'aTestForWnpmCI'), '5')
          }})

        const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
        expect(pkg.private).to.equal(true)
      })
    })
  })

  describe('with custom registry', () => {
    const registry = aRegistryDriver()

    before(() =>
      registry.start())

    after(() =>
      registry.stop())

    it('should use a different set of registries if passed, when fetching version for bump', async () => {
      const packageName = 'cool-npm-package'
      const [olderVersion, mostRecentVersion, nextVersion] = ['4.5.23', '4.5.24', '4.5.25']
      await registry.putPackageInRegistry({ packageName, version: olderVersion })
      await registry.putPackageInRegistry({ packageName, version: mostRecentVersion })

      const cwd = await registry.fetchPackage({ packageName, version: olderVersion })
      await prepareForRelease({ cwd, registries: [registry.getRegistryUrl()] })

      const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
      expect(pkg.version).to.equal(nextVersion)
    })
  })

  describe('with checkHashInPackageJson', function () {
    this.timeout(50000)
    const registry = aRegistryDriver()
    const packageName = 'cool-npm-package'
    const [olderVersion, mostRecentVersion, nextVersion] = ['4.5.23', '4.5.24', '4.5.25']

    beforeEach(() => registry.start())

    afterEach(() => registry.stop())

    it('should bump on diffrent checksum', async () => {
      await registry.putPackageInRegistry({ packageName, version: olderVersion, checksum: 'a' })
      await registry.putPackageInRegistry({ packageName, version: mostRecentVersion, checksum: 'b' })

      const cwd = await registry.fetchPackage({ packageName, version: olderVersion })
      await prepareForRelease({ cwd, registries: [registry.getRegistryUrl()] , checkHashInPackageJson: true})

      const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
      expect(pkg.version).to.equal(nextVersion)
    })

    it('should not publish on same checksum local', async () => {
      await registry.putPackageInRegistry({ packageName, version: olderVersion, checksum: 'a' })
      await registry.putPackageInRegistry({ packageName, version: mostRecentVersion, checksum: 'a' })

      const cwd = await registry.fetchPackage({ packageName, version: olderVersion })
      await prepareForRelease({ cwd, registries: [registry.getRegistryUrl()] , checkHashInPackageJson: true})

      const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
      expect(pkg.version).to.equal(mostRecentVersion)
    })

    it('should not publish on same checksum versions', async () => {
      await registry.putPackageInRegistry({ packageName, version: olderVersion, checksum: 'a' })
      await registry.putPackageInRegistry({ packageName, version: mostRecentVersion, checksum: 'a' })

      const cwd = await registry.fetchPackage({ packageName, version: olderVersion })
      await prepareForRelease({ cwd, registries: [registry.getRegistryUrl()] , checkHashInPackageJson: true, versionToCompare: olderVersion})

      const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
      expect(pkg.version).to.equal(mostRecentVersion)
    })
  })
})

describe('wnpm-release cli', () => {
  it('should bump patch by default', async () => {
    const cwd = await versionFetcher.fetch('wnpm-ci', '6.2.0')
    execSync(path.resolve(__dirname, '../scripts/wnpm-release.js'), {cwd})

    const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
    expect(pkg.private).to.equal(undefined)
    expect(pkg.version).to.not.equal('6.2.0')
    expect(pkg.version).to.contain('6.2.')
  })

  it('should bump minor', async () => {
    const cwd = await versionFetcher.fetch('wnpm-ci', '6.2.0')
    execSync(path.resolve(__dirname, '../scripts/wnpm-release.js --bump-minor'), {cwd})
    const pkg = await packageHandler.readPackageJson(path.join(cwd, 'package.json'))
    expect(pkg.private).to.equal(undefined)
    expect(pkg.version).to.not.equal('6.2.0')
    expect(pkg.version).to.contain('6.3.')
  })
})
