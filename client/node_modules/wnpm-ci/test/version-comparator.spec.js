const fs = require('fs')
const path = require('path')
const {expect} = require('chai')
const {compare} = require('../lib/version-comparator')
const versionFetcher = require('../lib/version-fetcher')

describe('version-comparator', () => {
  it('should compare version with itself', async () => {
    const cwd = await versionFetcher.fetch('wnpm-ci', '6.2.0')
    expect(await compare(cwd, '6.2.0')).to.equal(true)
  })

  it('should return false if we have difference', async () => {
    const cwd = await versionFetcher.fetch('wnpm-ci', '6.2.0')
    fs.writeFileSync(path.join(cwd, 'abc'), '111')
    expect(await compare(cwd, '6.2.0')).to.equal(false)
  })
})
