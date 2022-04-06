const mongoose = require('mongoose');

// 字义Schema(描述文档结构)
const distanceSchema = new mongoose.Schema({
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  createDate: { type: String, required: true },
  scope: { type: String, required: true },
})

// 定义Model
const DistanceModel = mongoose.model('distance', distanceSchema)

// 初始化默认超级管理员用户: admin/admin
DistanceModel.findOne({ latitude: '39.90569' }).then(dis => {
  if (!dis) {
    DistanceModel.create({
      latitude: '39.90569',
      longitude: '116.22299',
      createDate: '2022-04-03',
      scope: 50000,
    })
      .then(d => {
        console.log('初始化地点: latitude:39.90569 , longitude:116.22299')
      })
  }
})

module.exports = DistanceModel