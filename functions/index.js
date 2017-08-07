const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const axios = require('axios')

const parseXml = require('./xml').parse

const app = express()
app.use(cors())

function expectations(data, expect) {
  if (!!expect) {
    switch (expect) {
      case 'xml':
        return parseXml(data)
      default:
        throw new Exception({
          code: 'unexpected_result_type',
          message: 'The type was not expected',
        })
    }
  }

  return data
}

app.get('/get', cors(), (req, res) => {
  const {
    url, expect
  } = req.query

  if (!url) {
    return res.status(404).send({
      code: 'missing_required_parameter',
      message: 'The parameter `url` is required',
    })
  }

  // Set Caching
  res.set('Cache-Control', 'public, max-age=60, s-maxage=60')
  axios.get(url)
    .then(response => response.data)
    .then(data => expectations(data, expect))
    .then(response => res.send(response))
    .catch(err => res.status(400).send(err))
})

exports.api = functions.https.onRequest(app)
