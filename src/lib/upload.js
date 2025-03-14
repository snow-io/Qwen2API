const axios = require('axios')
const FormData = require('form-data')
const uuid = require('uuid')
const accountManager = require('./account')

async function upload(fileBase64, authToken) {
  const fileType = fileBase64.split('base64,')[0]
  const fileData = fileBase64.split('base64,')[1]

  const formData = new FormData()
  formData.append('file', fileData, {
    filename: uuid.v4(),
    contentType: fileType
  })
  try {

    const file_url_data = await axios.post('https://chat.qwen.ai/api/v1/files/getstsToken', {
      "filename": `${uuid.v4()}.${fileType.split('/')[1]}`,
      "filesize": fileData.length,
      "filetype": fileType.includes('image') ? 'image' : 'file'
    }, {
      headers: accountManager.getHeaders(authToken)
    })

    console.log(file_url_data.data)

    const file_url = file_url_data.data.file_url
    const file_path = file_url_data.data.file_path
    const access_key_id = file_url_data.data.access_key_id
    const access_key_secret = file_url_data.data.access_key_secret
    const security_token = file_url_data.data.security_token
    const date = new Date().toISOString().split('T')[0]
    console.log(date);

    const put_file_data = await axios.put(`https://qwen-webui-prod.oss-ap-southeast-1.aliyuncs.com/${file_path}`, fileData, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
        "Connection": "keep-alive",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "image/png",
        "sec-ch-ua-platform": "\"Windows\"",
        "authorization": `OSS4-HMAC-SHA256 Credential=${access_key_id}/${date}/ap-southeast-1/oss/aliyun_v4_request,Signature=2995a83946293f65ea13b0414f0004f4d288d5d24bceb8f7f06450b1fe380b24`,
        "x-oss-security-token": security_token,
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "x-oss-user-agent": "aliyun-sdk-js/6.22.0 Microsoft Edge 134.0.0.0 on Windows 10 64-bit",
        "x-oss-content-sha256": "UNSIGNED-PAYLOAD",
        "Origin": "https://chat.qwen.ai",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://chat.qwen.ai/",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
      }
    })
    // console.log(file_url)
    return file_url
  } catch (error) {
    // console.log(error)
    return false
  }
}

module.exports = {
  upload
}