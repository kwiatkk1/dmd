'use strict'
var TestRunner = require('test-runner')
var dmd = require('../')
var path = require('path')
var a = require('core-assert')

var runner = new TestRunner()

var fixture = [{
  id: 'someclass',
  longname: 'someclass',
  name: 'someclass',
  kind: 'class',
  description: 'is a class'
}]

runner.test('plugin', function () {
  var result = dmd(fixture, { plugin: 'dmd-plugin-example' })
  a.ok(/documentation generated on/.test(result))
})

runner.test('plugin: absolute path', function () {
  var result = dmd(fixture, { plugin: path.resolve(__dirname, 'fixture', 'dmd-plugin-example', 'lib', 'dmd-plugin-example.js') })
  a.ok(/documentation generated on/.test(result))
})

runner.test('plugin: none-existent path', function () {
  a.throws(function () {
    dmd(fixture, { plugin: 'forejfirweuhnvkljne' })
  })
})
