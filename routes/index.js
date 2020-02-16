var express = require('express');
var router = express.Router();
const User = require('../schemas/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  // console.log(User.find());
  res.send('Index');
});

// http://127.0.0.1:3000/sample
router.get("/sample", (req, res, next) => {
  const user = new User({
    name: "홍길동",
    age: 25,
  });
  user.save().then((result) => {
    res.json(result);
  }).catch((err) => {
    next(err);
  });
})


module.exports = router;
