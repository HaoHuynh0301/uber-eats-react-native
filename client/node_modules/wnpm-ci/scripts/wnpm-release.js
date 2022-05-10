#!/usr/bin/env node
const hasArg = n => process.argv.indexOf(n) >= 0
const shouldBumpMinor = hasArg('--bump-minor')
const checkHashInPackageJson = hasArg('--check-hash');

(async () => {
  await require('../index').prepareForRelease({shouldBumpMinor, checkHashInPackageJson})
})()
