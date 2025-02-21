const axios = require('axios')
const FormData = require('form-data')
const uuid = require('uuid')

async function uploadImage(base64Data, authorization) {
  // 将base64数据转换为Buffer
  const base64Image = base64Data.split(';base64,').pop()
  const imageBuffer = Buffer.from(base64Image, 'base64')

  // 创建FormData对象
  const formData = new FormData()
  formData.append('file', imageBuffer, {
    filename: uuid.v4(),
    contentType: 'image'
  })

  try {
    // 发送请求
    const response = await axios.post('https://chat.qwenlm.ai/api/v1/files/', formData, {
      headers: {
        ...formData.getHeaders(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
        'authorization': `Bearer ${authorization}`
      }
    })
    return response.data.id

  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = {
  uploadImage
}
