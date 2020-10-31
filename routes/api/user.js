const express = require('express');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User');
const utils = require('../../utils/utils');
const SECRETKEY = require('../../config/keys').SECRETKEY;
const encrypt = utils.encrypt; //加密方法
const decrypt = utils.decrypt; //解密方法
router.get('/test', (req, res) => {
  res.json({ msg: "login works" });
});
/**
 * $route POST api/users/register
 * $parameters name:String, email:String, password:String
 */
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(200).json({ code: 0, message: 'The email address has been registered!' });
    }
    const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mp' })
    const newUser = new User({
      avatar,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    encrypt(newUser.password).then(encryptedPassword => {
      newUser.password = encryptedPassword;
      return newUser.save();
    }).then(user => {
      res.status(200).json({ code: 1, message: 'Register successfully!', data: { user } });
    }).catch(err => { throw err; });
  }).catch(err => { throw err });
});

/**
 * $route POST api/users/login
 * $parameters email:String, password:String
 */
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({ email }).then(user => {
    if (!user) { return res.status(200).json({ code: 0, message: 'The user does not exist!' }); }
    // 密码匹配
    decrypt(password, user.password).then(isMatch => {
      if (isMatch) {
        const data = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        const token = jwt.sign(data, SECRETKEY, { expiresIn: 3600 });
        res.status(200).json({
          code: 1, message: 'Login successfully!', data: { token: `Bearer ${token}` }
        });
      } else {
        res.status(200).json({ code: 0, message: 'Wrong password!' });
      }
    }).catch(err => { throw err; });
  });
});
module.exports = router;