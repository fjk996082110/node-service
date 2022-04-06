const mongoose = require('mongoose');
const express = require('express');
const router = require('./routers')
const tokenMiddleWare = require('./middleware/token-middleware')
const app = express();

// 获取数据库配置
const { DB_CONFIG, SERVICE_CONFIG } = require('./config/db');

// 使用中间件
app.use(express.json());
app.use(tokenMiddleWare);

app.use('/', router)

mongoose.connect(
  `mongodb://${DB_CONFIG.HOST}/${DB_CONFIG.DBNAME}`,
  {
    authSource: 'admin',
    user: DB_CONFIG.NAME,
    pass: DB_CONFIG.PASSWROD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  }
).then(() => {
  console.log('数据库连接成功');
  app.listen(SERVICE_CONFIG.PORT, () => {
    console.log(`服务器启动成功, 服务器地址: http://localhost:${SERVICE_CONFIG.PORT}`)
  })
}).catch(error => {
  console.error('连接数据库失败', error)
})
