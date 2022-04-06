// 文件上传
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const dirPath = path.join(__dirname, '..', 'public/upload')

// 创建文件夹
const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function (err) {
        if (err) {
          console.log('文件创建失败', err)
        } else {
          cb(null, dirPath)
        }
      })
    } else {
      cb(null, dirPath)
    }
  },
  filename: function (req, file, cb) {
    console.log(file);
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

const upload = multer({storage})
// single的key要和小程序upload的key保持一致
const uploadSingle = upload.single('image')

module.exports = function (router) {

  // 上传图片
  router.post('/img/upload', (req, res) => {
    uploadSingle(req, res, function (err) { //错误处理
      console.log(err);
      if (err) {
        return res.send({
          status: 401,
          msg: '上传文件失败'
        })
      }
      var file = req.file
      res.send({
        status: 200,
        data: {
          name: file.filename,
          url: 'http://localhost:4000/upload/' + file.filename
        }
      })

    })
  })

  // 删除图片
  // router.post('/manage/img/delete', (req, res) => {
  //   const {name} = req.body
  //   fs.unlink(path.join(dirPath, name), (err) => {
  //     if (err) {
  //       console.log(err)
  //       res.send({
  //         status: 1,
  //         msg: '删除文件失败'
  //       })
  //     } else {
  //       res.send({
  //         status: 0
  //       })
  //     }
  //   })
  // })
}