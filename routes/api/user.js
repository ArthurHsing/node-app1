const express = require('express');
const router = express.Router();
const encrypt = require('../../utils/utils').encrypt; //加密方法
const User = require('../../models/User');
const gravatar = require('gravatar');
router.get('/test', (req, res) => {
  res.json({ msg: "login works" });
});
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
      res.status(200).json({ code: 1, message: 'Register successfully!', user });
    }).catch(err => {
      throw err;
    });
  }).catch(err => { throw err });
});
module.exports = router;