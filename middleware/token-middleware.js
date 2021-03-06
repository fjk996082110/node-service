const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, WHITE_LIST } = require('../config/jwt');
const UserModel = require('../models/UserModel');

module.exports = function (req, res, next) {
  const url = req.url
  //配置白名单
  if (WHITE_LIST.indexOf(url) !== -1) {
    return next()
  }
  const token = req.headers['authorization']
  if (!token) {
    return res.send({ status: 501, data: { msg: '您没有权限调用此接口' } })
  }
  jwt.verify(token, PRIVATE_KEY, (err, data) => {
    if (err) {
      return res.send({ status: 501, data: { msg: `token校验失败，失败原因：${err}` } })
    } else {
      UserModel.findOne({ _id: data.id }).then((v) => {
        if (v) {
          req.userInfo = data
          return next()
        } else {
          return res.send({ status: 501, data: { msg: '您没有权限调用此接口，未获取到合法的token' } })
        }
      }).catch((err) => {
        return res.send({ status: 501, data: { msg: 'token匹配失败' } })
      })
    }
  })
}
