#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const BinaryXML = require('binary-xml')
const args = process.argv.slice(2)

console.log('Binary XML -> XML')
console.log('-----------------')
console.log()

const file = args[0]? path.resolve(args[0]) : null
if (!file) {
  console.log(`
    USAGE:
      bxml [file.xml]
  `)
  process.exit()
}

if (!fs.existsSync(file)) {
  console.log('File not found:', file)
  process.exit()
}

const data = fs.readFileSync(file)
const reader = new BinaryXML(data)
const document = reader.parse()

const convertedFile = `${file}.json`
fs.writeFileSync(convertedFile, JSON.stringify(document, null, 2))
console.log(`Written to ${convertedFile}`)
console.log()
