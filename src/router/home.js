const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const accountManager = require('../lib/account.js')

router.get('/', async (req, res) => {
  try {
    let html = fs.readFileSync(path.join(__dirname, 'assets', 'home.html'), 'utf-8')
    if (accountManager) {
      res.setHeader('Content-Type', 'text/html')
      html = html.replace('BASE_URL', `http://${process.env.LISTEN_ADDRESS ? process.env.LISTEN_ADDRESS : "localhost"}:${process.env.SERVICE_PORT}${process.env.API_PREFIX ? process.env.API_PREFIX : ''}`)
      html = html.replace('RequestNumber', accountManager.getRequestNumber())
      html = html.replace('SuccessAccountNumber', accountManager.getAccountTokensNumber())
      html = html.replace('ErrorAccountNumber', accountManager.getErrorAccountTokensNumber())
      html = html.replace('ErrorAccountTokens', accountManager.getErrorAccountTokens().join('\n'))
    }
    res.send(html)
  } catch (e) {
    console.log(e)
    res.status(500)
      .json({
        error: "服务错误!!!"
      })
  }
})

module.exports = router