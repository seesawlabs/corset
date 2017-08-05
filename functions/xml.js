const parseString = require('xml2js').parseString
const promlog = require('./logger').promlog

function _parse(xml) {
  return new Promise((yup, nope) => {
    parseString(xml, (err, result) => {
      if (err) {
        return nope(err)
      }
      yup(result)
    })
  })
}

exports.parse = function(xml) {
  return _parse(xml)
}
