// info
const UserModel = require('../models/UserModel');
const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../config/jwt');


module.exports = function (router) {
  // 登陆
  router.post('/info/login', function (req, res) {
    const { username, password } = req.body;
    UserModel.findOne({ username: username, password: md5(password) }).then((user) => {
      if (user) {
        const token = jwt.sign({ id: user._id }, PRIVATE_KEY, { expiresIn: '7 days' })
        res.send({ status: 200, data: { userInfo: user, token: token } })
      } else {
        res.send({ status: 201, data: { msg: '用户名或密码错误' } })
      }
    }).catch((err) => {
      res.send({ status: 401, data: { msg: `未知错误:${err}` } })
    })
  })
}