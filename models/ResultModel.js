const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
/**
 * TODO:
 *  1、打卡成功后保存记录
 *  2、问题：
 *      用户真实姓名前端传？ 后台查表？
 *      第一次打卡和第二次打卡区分？
 */
// 字义Schema(描述文档结构)
const resultSchema = new mongoose.Schema({
  username: { type: String, required: true }, // 用户名
  password: { type: String, required: true }, // 密码
})

// 定义Model
const UserModel = mongoose.model('result', resultSchema)

// UserModel.findOne({ username: 'admin' }).then(user => {
//   if (!user) {
//     UserModel.create({ username: 'admin', password: md5('admin') })
//       .then(user => {
//         console.log('初始化用户: 用户名: admin 密码为: admin')
//       })
//   }
// })

module.exports = UserModel