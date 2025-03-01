const axios = require('axios')
const uuid = require('uuid')
const sendChatRequest = async (model, messages, stream, authToken) => {
  let body = {
    "model": model,
    "messages": messages,
    "stream": stream,
    "chat_type": "t2t",
    "id": uuid.v4()
  }

  // 判断是否开启推理
  let thinkingEnabled = false
  if (model.includes('-thinking')) {
    thinkingEnabled = true
    messages[messages.length - 1].feature_config = {
      "thinking_enabled": thinkingEnabled
    }
    body.model = body.model.replace('-thinking', '')
  }

  if (model.includes('-search')) {
    messages[messages.length - 1].chat_type = 'search'
    body.model = body.model.replace('-search', '')
    body.chat_type = 'search'
  }

  try {

    console.log(JSON.stringify(body))
    const response = await axios.post('https://chat.qwenlm.ai/api/chat/completions',
      body,
      {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        responseType: stream ? 'stream' : 'json'
      }
    )

    return {
      status: 200,
      response: response.data
    }
  }
  catch (error) {
    // console.log(error)
    return {
      status: 500,
      response: null
    }
  }

}

module.exports = {
  sendChatRequest
}
