#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var launch = require('opn')
var parse = require('url-parse-as-address')
var through = require('through2')
var xtend = require('xtend')

process.stdin.pipe(opnr(argv)).pipe(process.stdout)

function opnr(opt) {
  opt = xtend({
    type: 'connect'
  }, opt)

  return through(function(buf, enc, next) {
    var json = parseJSON(buf)
    if (json) {
      var url = typeof json.url === 'string' ? json.url : json.uri
      if (url && json.type === opt.type) {
        process.nextTick(function() {
          launch(parse(url).href)
        })
      }
    }
    this.push(buf)
    next()
  })

  function parseJSON(data) {
    try {
      return JSON.parse(data)
    } catch(e) {}
    return null
  }
}