const axios = require('axios')
const uuid = require('uuid')
const { sleep } = require('./tools')
const accountManager = require('./account')

async function createImageRequest(prompt, model = 'qwen-max-latest', size = '1024*1024', authToken) {

  const sizeMap = [
    '1024*1024',
    '768*1024',
    '1024*768',
    '1280*720',
    '720*1280'
  ]

  if (!sizeMap.includes(size)) {
    size = '1024*1024'
  }

  model = model.replace('-draw', '').replace('-thinking', '').replace('-search', '')

  try {
    const response = await axios.post('https://chat.qwen.ai/api/chat/completions', {
      "stream": false,
      "incremental_output": true,
      "chat_type": "t2i",
      "model": model,
      "messages": [
        {
          "role": "user",
          "content": prompt,
          "chat_type": "t2i",
          "extra": {},
          "feature_config": {
            "thinking_enabled": false
          }
        }
      ],
      "id": uuid.v4(),
      "size": size
    }, {
      headers: accountManager.getHeaders(authToken)
    })

    return {
      status: 200,
      task_id: response.data.messages.find(item => item.role === 'assistant').extra.wanx.task_id
    }

  } catch (error) {
    console.log(error)
    return {
      status: 500,
      task_id: null
    }
  }

}

async function awaitImage(task_id, authorization) {

  for (let i = 0; i < 30; i++) {
    try {
      const response = await axios.get(`https://chat.qwen.ai/api/v1/tasks/status/${task_id}`, {
        headers: accountManager.getHeaders(authorization)
      })
      if (response.data.content !== '') {
        // console.log(`等待图片生成完成...`)
        return {
          status: 200,
          url: response.data.content
        }
      }
    } catch (error) {
      continue
    }
    // console.log(`等待次数: ${i + 1}`)
    await sleep(6000)
  }

  return {
    status: 500,
    url: null
  }
}

module.exports = {
  createImageRequest,
  awaitImage
}
