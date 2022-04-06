// info
const DistanceModel = require('../models/DistancesModel');


module.exports = function (router) {
  // 获取打卡位置及范围
  router.get('/distances/getDistances', function (req, res) {
    const { date } = req.query;
    DistanceModel.findOne({ createDate: date}).then((dis) => {
      if (dis) {
        res.send({ status: 200, data: dis })
      } else {
        res.send({ status: 201, data: { msg: '未查询到今天' } })
      }
    }).catch((err) => {
      res.send({ status: 401, data: { msg: `未知错误:${err}` } })
    })
  })
}