const express = require('express')
const router = express.Router()
const { createImageRequest, awaitImage } = require('../lib/image.js')
const accountManager = require('../lib/account.js')

router.post(`${process.env.API_PREFIX ? process.env.API_PREFIX : ''}/v1/images/generations`, async(req, res) => {
  const { model, prompt, n, size } = req.body
  let authToken = req.headers.authorization

  if (!authToken) {
    return res.status(403)
      .json({
        error: "请提供正确的 Authorization token"
      })
  }

  if (authToken === `Bearer ${process.env.API_KEY}` && accountManager) {
    authToken = accountManager.getAccountToken()
  } else {
    authToken = authToken.replace('Bearer ', '')
  }
  
  const response_data = await createImageRequest(prompt, model, size, authToken)
  if (response_data.status !== 200) {
    res.status(500).json({
      error: response_data.error
    })
    return
  }
  const awaitImage_data = await awaitImage(response_data.task_id, authToken)
  if (awaitImage_data.status !== 200) {
    res.status(500).json({
      error: awaitImage_data.error
    })
    return
  }

  const images_url = []

  for (let i = 0; i < n; i++) {
    images_url.push(awaitImage_data.url)
  }

  const response = {
    "created": new Date().getTime(),
    "data": images_url.map(item => ({
      "url": item
    }))
  }
  res.json(response)

})

module.exports = router
