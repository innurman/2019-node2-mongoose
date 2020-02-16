var express = require('express');
var router = express.Router();
const User = require('../schemas/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  // console.log(User.find());
  //res.send('Index');
  res.render('index.pug');
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

// http://127.0.0.1:3000/
router.post("/user/save", async (req, res, next) => {
  const {name, age} = req.body;
  const user = new User({
    name,
    age,
  });

  try {
    const result = await user.save();
    res.json(result);
  }
  catch(err) {
    next(err);
  }
  
  /*
  user.save().then((result) => {
    res.json(result);
  }).catch((err) => {
    next(err);
  });
  */
})


module.exports = router;
