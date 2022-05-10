const fs = require('fs')
const tmp = require('tmp')
const path = require('path')
const {expect} = require('chai')
const {compareDirectories} = require('../lib/directory-diff')

describe('directory-diff', () => {
  let path1, path2
  beforeEach(() => {
    path1 = tmp.dirSync({unsafeCleanup: true}).name
    path2 = tmp.dirSync({unsafeCleanup: true}).name
  })

  it('should return true for identical dirs', async () => {
    fs.writeFileSync(path.join(path1, 'a'), '111')
    fs.writeFileSync(path.join(path2, 'a'), '111')
    expect(await compareDirectories(path1, path2)).to.equal(true)
  })

  it('should return false for different dirs', async () => {
    fs.writeFileSync(path.join(path1, 'a'), '111')
    fs.writeFileSync(path.join(path2, 'a'), '222')
    expect(await compareDirectories(path1, path2)).to.equal(false)
  })

  it('should return true for deeply identical dirs', async () => {
    fs.writeFileSync(path.join(path1, 'a'), '111')
    fs.writeFileSync(path.join(path2, 'a'), '111')
    fs.mkdirSync(path.join(path1, 'b'))
    fs.mkdirSync(path.join(path2, 'b'))
    fs.writeFileSync(path.join(path1, 'b', 'c'), '111')
    fs.writeFileSync(path.join(path2, 'b', 'c'), '111')
    expect(await compareDirectories(path1, path2)).to.equal(true)
  })

  it('should return false deeply different dirs', async () => {
    fs.writeFileSync(path.join(path1, 'a'), '111')
    fs.writeFileSync(path.join(path2, 'a'), '111')
    fs.mkdirSync(path.join(path1, 'b'))
    fs.mkdirSync(path.join(path2, 'b'))
    fs.writeFileSync(path.join(path1, 'b', 'c'), '111')
    fs.writeFileSync(path.join(path2, 'b', 'c'), '222')
    expect(await compareDirectories(path1, path2)).to.equal(false)
  })

  it('should ignore .npmignore when comparing', async () => {
    fs.writeFileSync(path.join(path1, '.npmignore'), '111')
    fs.writeFileSync(path.join(path1, 'a'), '111')
    fs.writeFileSync(path.join(path2, 'a'), '111')
    expect(await compareDirectories(path1, path2)).to.equal(true)
  })

  it('should return false for different dependencies in package.json', async () => {
    fs.writeFileSync(path.join(path1, 'package.json'), JSON.stringify({dependencies: {lodash: '1.0.0'}}))
    fs.writeFileSync(path.join(path2, 'package.json'), JSON.stringify({dependencies: {lodash: '2.0.0'}}))
    expect(await compareDirectories(path1, path2)).to.equal(false)
  })

  it('should ignore version in package.json', async () => {
    fs.writeFileSync(path.join(path1, 'package.json'), JSON.stringify({version: '1.0.0'}))
    fs.writeFileSync(path.join(path2, 'package.json'), JSON.stringify({version: '2.0.0'}))
    expect(await compareDirectories(path1, path2)).to.equal(true)
  })

  it('should return false for different dependencies in npm-shrinkwrap.json', async () => {
    fs.writeFileSync(path.join(path1, 'npm-shrinkwrap.json'), JSON.stringify({dependencies: {lodash: {}}}))
    fs.writeFileSync(path.join(path2, 'npm-shrinkwrap.json'), JSON.stringify({dependencies: {underscore: {}}}))
    expect(await compareDirectories(path1, path2)).to.equal(false)
  })

  it('should return false for different version in npm-shrinkwrap.json', async () => {
    fs.writeFileSync(path.join(path1, 'npm-shrinkwrap.json'), JSON.stringify({dependencies: {lodash: {version: '1.0.0'}}}))
    fs.writeFileSync(path.join(path2, 'npm-shrinkwrap.json'), JSON.stringify({dependencies: {lodash: {version: '2.0.0'}}}))
    expect(await compareDirectories(path1, path2)).to.equal(false)
  })

  it('should ignore other strings in npm-shrinkwrap.json', async () => {
    fs.writeFileSync(path.join(path1, 'npm-shrinkwrap.json'), JSON.stringify({dependencies: {lodash: {url: 'xxx'}}}))
    fs.writeFileSync(path.join(path2, 'npm-shrinkwrap.json'), JSON.stringify({dependencies: {lodash: {url: 'yyy'}}}))
    expect(await compareDirectories(path1, path2)).to.equal(true)
  })

})
