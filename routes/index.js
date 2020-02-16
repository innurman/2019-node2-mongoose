var express = require('express');
var router = express.Router();
const User = require('../schemas/user');
const { alert } = require('../modules/util');

/* GET home page. */
router.get('/', async (req, res, next) => {
  // console.log(User.find());
  //res.send('Index');
  const result = await User.find();
  res.render('index.pug', {result});
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
});

// remove() : https://mongoosejs.com/docs/api/query.html#query_Query-remove
//    http://127.0.0.1:3000/user/delete/5e48dc2dc7427b23c029e82f
//    http://127.0.0.1:3000/user/delete/5e48e05a63e8311eacd616ad
router.get("/user/delete/:id", async (req, res, next) => {
  const result = await User.remove({
    _id: req.params.id
  });
  //res.json(result);
  if(result.ok === 1) {
    //res.redirect("/");
    res.send(alert("삭제하였습니다.", "/"));
  }
  else res.send(alert("삭제에 실패했습니다.", "/"));
});


// update() : https://mongoosejs.com/docs/api/query.html#query_Query-update
// router.get("/user/update/:id", async (req, res, next) => {
//   const result = await User.update({
//     _id: req.params.id
//   }, {
//     age: 25
//   });
//   //res.json(result);
// });


module.exports = router;
