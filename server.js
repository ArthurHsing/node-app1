const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./config/keys').mongoURI; //mongodb的uri
const users = require('./routes/api/user');
const profiles = require('./routes/api/profile');
const app = express();
const port = process.env.PORT || 5000;
/**
 * 测试接口
 */
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  console.log('Mongodb connected!');
}).catch(err => {
  console.log(err);
});
/**
 * 为users这个文件导出的路由配置，/api/users这个路径
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.get('/', function (req, res) {
  res.send('Hello, world!');
});
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});