'use script'

const fs = require('fs')
const tmp = require('tmp')
const path = require('path')
const mkdirp = require('mkdirp')
const {expect} = require('chai')
const process = require('process')
const writeGitHead = require('../lib/write-git-head')

describe('write-git-head', () => {
  let dirName, pwd
  const commitSha = 'ebfbfb37c3feaae51b0210014e575fee1ba01f85'
  const INITIAL_BUILD_VCS_NUMBER = process.env.BUILD_VCS_NUMBER

  beforeEach(() => {
    dirName = tmp.dirSync({unsafeCleanup: true}).name
    pwd = process.cwd()
    process.env.BUILD_VCS_NUMBER = commitSha
  })
  afterEach(() => {
    process.chdir(pwd)
    process.env.BUILD_VCS_NUMBER = INITIAL_BUILD_VCS_NUMBER
  })

  it('should create .git dir and write a git HEAD if BUILD_VCS_NUMBER exists', async () => {
    const headFile = path.join(dirName, '.git/HEAD')
    await writeGitHead(dirName)

    expect(fs.existsSync(headFile))
    expect(fs.readFileSync(headFile, 'utf-8')).to.be.equal(commitSha)
  })

  it('should write a git HEAD to .git if BUILD_VCS_NUMBER exists', async () => {
    const gitDirname = path.join(dirName, '.git')
    const headFile = path.join(gitDirname, 'HEAD')
    mkdirp.sync(gitDirname)
    await writeGitHead(dirName)

    expect(fs.existsSync(headFile))
    expect(fs.readFileSync(headFile, 'utf-8')).to.be.equal(commitSha)
  })

  it('should not write a git HEAD if .git/HEAD exists', async () => {
    const gitDirname = path.join(dirName, '.git')
    const headFile = path.join(gitDirname, 'HEAD')
    const existedSha = '1bfbkw47c3feaae5u3s2100oi2575fee1ba01f8w'
    mkdirp.sync(gitDirname)
    fs.writeFileSync(headFile, existedSha, {encoding: 'utf-8'})
    await writeGitHead(dirName)

    expect(fs.existsSync(headFile))
    expect(fs.readFileSync(headFile, 'utf-8')).to.be.equal(existedSha)
  })

  it('should not write a git HEAD if BUILD_VCS_NUMBER doesn\'t exist', async () => {
    const headFile = path.join(dirName, '.git/HEAD')
    delete process.env.BUILD_VCS_NUMBER
    await writeGitHead(dirName)

    expect(fs.existsSync(headFile) === false)
  })
})
