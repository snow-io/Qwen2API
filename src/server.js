const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const accountManager = require('./lib/account.js')
const homeRouter = require('./router/home.js')
const modelsRouter = require('./router/models.js')
const chatRouter = require('./router/chat.js')
const imagesRouter = require('./router/images.js')

app.use(bodyParser.json({ limit: '128mb' }))
app.use(bodyParser.urlencoded({ limit: '128mb', extended: true }))
app.use(homeRouter)
app.use(modelsRouter)
app.use(chatRouter)
app.use(imagesRouter)

const startInfo = `
-------------------------------------------------------------------
监听地址：${process.env.LISTEN_ADDRESS ? process.env.LISTEN_ADDRESS : 'localhost'}
服务端口：${process.env.SERVICE_PORT}
API前缀：${process.env.API_PREFIX ? process.env.API_PREFIX : '未设置'}
账户数：${accountManager ? accountManager.getAccountTokensNumber() : '未启用'}
-------------------------------------------------------------------
`
if (process.env.LISTEN_ADDRESS) {
  app.listen(process.env.SERVICE_PORT || 3000, process.env.LISTEN_ADDRESS, () => {
    console.log(startInfo)
  })
} else {
  app.listen(process.env.SERVICE_PORT || 3000, () => {
    console.log(startInfo)
  })
}

