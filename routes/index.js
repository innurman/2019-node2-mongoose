var express = require('express');
var router = express.Router();
const User = require('../schemas/user');
const { alert } = require('../modules/util');

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
  const oldUser = await User.find({name});
  // console.log(name, age);
  // console.log(oldUser);
  
  if(oldUser.length) {
    // res.send(`<script>
    // alert("존재하는 아이디 입니다."); 
    // location.href="/";</script>`);
    res.send(alert("존재하는 이름입니다.", "/"));
  }
  else {
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
