const express = require('express');

const router = express.Router();

router.post('/postTest', (res, req) => {
  const { body } = res;
  req.send({
    status: 200,
    msg: 'post success',
    bodyMsg: body.key,
  });
});

router.get('/getTest', (res, req) => {
  // get query
  const { query } = res
  req.send({
    status: 200,
    msg: 'get success',
    queryMsg: query.key,
  })
})

require('./user')(router)
require('./distances')(router)
require('./upload')(router)

module.exports = router;