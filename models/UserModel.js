const mongoose = require('mongoose');
const md5 = require('blueimp-md5');

// 字义Schema(描述文档结构)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // 用户名
  password: { type: String, required: true }, // 密码
  trueName: { type: String, required: true }, // 姓名
})

// 定义Model
const UserModel = mongoose.model('users', userSchema)

// 初始化默认超级管理员用户: admin/admin
UserModel.findOne({ username: 'admin' }).then(user => {
  if (!user) {
    UserModel.create({ username: 'admin', password: md5('admin'), trueName: '测试账号' })
      .then(user => {
        console.log('初始化用户: 用户名: admin 密码为: admin')
      })
  }
})

module.exports = UserModel