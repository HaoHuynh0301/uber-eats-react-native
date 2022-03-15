const assert = require('assert')
const versionCalc = require('../lib/version-calculations')
const publishedVersionsToTest = ['0.2.0', '1.1.1', '1.1.2', '5.1.3', '5.4.0', '5.3.2', '5.4.1', '5.4.3']

describe('version-calculations', function () {
  describe('#calculateNextVersionPackage', function () {
    it("should return a patch version increment when it's part of the latest 'branch'", function () {
      assert.equal('5.4.4', versionCalc.calculateNextVersionPackage('5.4.1', publishedVersionsToTest))
    })

    it("should return a patch version increment when it's part of a previous 'branch'", function () {
      assert.equal('1.1.3', versionCalc.calculateNextVersionPackage('1.1.1', publishedVersionsToTest))
    })

    it("should return itself when it's the largest version of the latest 'branch'", function () {
      assert.equal('5.4.5', versionCalc.calculateNextVersionPackage('5.4.5', publishedVersionsToTest))
    })

    it("should return itself when it's the largest version of the previous 'branch'", function () {
      assert.equal('1.1.4', versionCalc.calculateNextVersionPackage('1.1.4', publishedVersionsToTest))
    })

    it("should return itself when it's the only version of a 'branch'", function () {
      assert.equal('2.0.4', versionCalc.calculateNextVersionPackage('2.0.4', publishedVersionsToTest))
    })

    it("should return itself when it's the only version of the previous 'branch'", function () {
      assert.equal('2.0.4', versionCalc.calculateNextVersionPackage('2.0.4', publishedVersionsToTest))
    })

    it("should return a patch version increment when it's the same as the latest version of the latest 'branch'", function () {
      assert.equal('5.4.4', versionCalc.calculateNextVersionPackage('5.4.3', publishedVersionsToTest))
    })

    it("should return a patch version increment when it's the same as the latest version of the previous 'branch'", function () {
      assert.equal('1.1.3', versionCalc.calculateNextVersionPackage('1.1.2', publishedVersionsToTest))
    })

    it('should retain prerelease part when incrementing', function () {
      assert.equal('1.1.3-a.a', versionCalc.calculateNextVersionPackage('1.1.2-a.a', publishedVersionsToTest))
    })

    it('should return itself when no published versions', function () {
      assert.equal('1.1.3', versionCalc.calculateNextVersionPackage('1.1.3', []))
    })
  })

  describe('#calculateLatestPublishedVersion', () => {
    it('#calculateCurrentPublished ', () => {
      assert.equal('5.4.3', versionCalc.calculateCurrentPublished('5.4.1', publishedVersionsToTest))
      assert.equal('1.1.2', versionCalc.calculateCurrentPublished('1.1.1', publishedVersionsToTest))
      assert.equal('5.4.3', versionCalc.calculateCurrentPublished('5.4.3', publishedVersionsToTest))
      assert.equal('1.1.2', versionCalc.calculateCurrentPublished('1.1.2', publishedVersionsToTest))
    })

    it('should return null when current package version is not published', () => {
      assert.equal(null, versionCalc.calculateCurrentPublished('5.4.5', publishedVersionsToTest))
      assert.equal(null, versionCalc.calculateCurrentPublished('1.1.4', publishedVersionsToTest))
      assert.equal(null, versionCalc.calculateCurrentPublished('2.0.4', publishedVersionsToTest))
      assert.equal(null, versionCalc.calculateCurrentPublished('2.0.4', publishedVersionsToTest))
      assert.equal(null, versionCalc.calculateCurrentPublished('1.1.3', []))
    })
  })

  describe('#calculateNextVersionPackage bump minor', function () {
    it("should return a minor version increment when it's part of the latest 'branch'", function () {
      assert.equal('5.5.0', versionCalc.calculateNextVersionPackage('5.1.0', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it("should return a minor version increment when it's part of a previous 'branch'", function () {
      assert.equal('1.2.0', versionCalc.calculateNextVersionPackage('1.0.0', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it("should return itself when it's the largest version of the latest 'branch'", function () {
      assert.equal('5.5.0', versionCalc.calculateNextVersionPackage('5.5.0', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it("should return itself when it's the largest version of the previous 'branch'", function () {
      assert.equal('1.2.0', versionCalc.calculateNextVersionPackage('1.2.0', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it("should return itself when it's the only version of a 'branch'", function () {
      assert.equal('6.0.0', versionCalc.calculateNextVersionPackage('6.0.0', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it("should return itself when it's the only version of the previous 'branch'", function () {
      assert.equal('2.0.0', versionCalc.calculateNextVersionPackage('2.0.0', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it("should return a minor version increment when it's the same as the latest version of the latest 'branch'", function () {
      assert.equal('5.5.0', versionCalc.calculateNextVersionPackage('5.4.3', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it("should return a minor version increment when it's the same as the latest version of the previous 'branch'", function () {
      assert.equal('1.2.0', versionCalc.calculateNextVersionPackage('1.1.2', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it('should return a minor version increment for 0.x versions', function () {
      assert.equal('0.3.0', versionCalc.calculateNextVersionPackage('0.1.0', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it('should return itself when no published versions', function () {
      assert.equal('1.1.3', versionCalc.calculateNextVersionPackage('1.1.3', [], {shouldBumpMinor: true}))
    })
  })

  describe('#calculateLatestPublishedVersion bump minor', () => {
    it('#calculateCurrentPublished ', () => {
      assert.equal('5.4.3', versionCalc.calculateCurrentPublished('5.3.1', publishedVersionsToTest, {shouldBumpMinor: true}))
      assert.equal('1.1.2', versionCalc.calculateCurrentPublished('1.0.1', publishedVersionsToTest, {shouldBumpMinor: true}))
      assert.equal('5.4.3', versionCalc.calculateCurrentPublished('5.4.3', publishedVersionsToTest, {shouldBumpMinor: true}))
      assert.equal('1.1.2', versionCalc.calculateCurrentPublished('1.1.2', publishedVersionsToTest, {shouldBumpMinor: true}))
    })

    it('should return null when current package version is not published', () => {
      assert.equal(null, versionCalc.calculateCurrentPublished('5.5.5', publishedVersionsToTest, {shouldBumpMinor: true}))
      assert.equal(null, versionCalc.calculateCurrentPublished('1.2.4', publishedVersionsToTest, {shouldBumpMinor: true}))
      assert.equal(null, versionCalc.calculateCurrentPublished('2.0.4', publishedVersionsToTest, {shouldBumpMinor: true}))
      assert.equal(null, versionCalc.calculateCurrentPublished('2.0.4', publishedVersionsToTest, {shouldBumpMinor: true}))
      assert.equal(null, versionCalc.calculateCurrentPublished('1.1.3', [], {shouldBumpMinor: true}))
    })
  })
})
