const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const uuid = require('uuid')
const { uploadImage } = require('./image')
require('dotenv').config()

app.use(bodyParser.json())
// 设置上传文件大小限制
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


const isJson = (str) => {
  try {
    JSON.parse(str)
    return true
  } catch (error) {
    return false
  }
}

app.get(`${process.env.API_PREFIX ? process.env.API_PREFIX : ''}/v1/models`, async (req, res) => {
  try {
    const response = await axios.get('https://chat.qwenlm.ai/api/models',
      {
        headers: {
          "Authorization": req.headers.authorization,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      })
    res.json(response.data)
  } catch (error) {
    res.status(403)
      .json({
        error: "请提供正确的 Authorization token"
      })
  }
})

app.post(`${process.env.API_PREFIX ? process.env.API_PREFIX : ''}/v1/chat/completions`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403)
      .json({
        error: "请提供正确的 Authorization token"
      })
  }
  const messages = req.body.messages
  let imageId = null
  const isImageMessage = Array.isArray(messages[messages.length - 1].content) === true && messages[messages.length - 1].content[1].image_url.url
  if (isImageMessage) {
    imageId = await uploadImage(messages[messages.length - 1].content[1].image_url.url, req.headers.authorization)
    messages[messages.length - 1].content[1] = {
      "type": "image",
      "image": imageId
    }
  }

  const stream = req.body.stream

  const notStreamResponse = async (response) => {
    const bodyTemplate = {
      "id": `chatcmpl-${uuid.v4()}`,
      "object": "chat.completion",
      "created": new Date().getTime(),
      "model": req.body.model,
      "choices": [
        {
          "index": 0,
          "message": {
            "role": "assistant",
            "content": response.choices[0].message.content
          },
          "finish_reason": "stop"
        }
      ],
      "usage": {
        "prompt_tokens": JSON.stringify(req.body.messages).length,
        "completion_tokens": response.choices[0].message.content.length,
        "total_tokens": JSON.stringify(req.body.messages).length + response.choices[0].message.content.length
      }
    }
    res.json(bodyTemplate)
  }

  const streamResponse = async (response) => {
    const id = uuid.v4()
    const decoder = new TextDecoder('utf-8')
    let backContent = null
    response.on('data', (chunk) => {
      const decodeText = decoder.decode(chunk)

      const lists = decodeText.split('\n').filter(item => item.trim() !== '')
      for (const item of lists) {
        const decodeJson = isJson(item.replace(/^data: /, '')) ? JSON.parse(item.replace(/^data: /, '')) : null

        if (decodeJson === null) {
          continue
        }

        let content = decodeJson.choices[0].delta.content

        if (backContent === null) {
          backContent = content
        } else {
          const temp = content
          content = content.replace(backContent, '')
          backContent = temp
        }

        const StreamTemplate = {
          "id": `chatcmpl-${id}`,
          "object": "chat.completion.chunk",
          "created": new Date().getTime(),
          "choices": [
            {
              "index": 0,
              "delta": {
                "content": content
              },
              "finish_reason": null
            }
          ]
        }
        res.write(`data: ${JSON.stringify(StreamTemplate)}\n\n`)
      }
    })

    response.on('end', () => {
      res.write(`data: [DONE]\n\n`)
      res.end()
    })

  }

  try {
    const response = await axios.post('https://chat.qwenlm.ai/api/chat/completions',
      req.body,
      {
        headers: {
          "Authorization": req.headers.authorization,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        responseType: stream ? 'stream' : 'json'
      }
    )
    if (stream) {
      res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      })
      streamResponse(response.data)
    } else {
      res.set({
        'Content-Type': 'application/json',
      })
      notStreamResponse(response.data)
    }

  } catch (error) {
    console.log(error)
    res.status(500)
      .json({
        error: "罢工了，不干了!!!"
      })
  }

})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

