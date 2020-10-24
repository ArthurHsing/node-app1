const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI; //mongodb的uri
const users = require('./routes/api/user');
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
app.use('/api/users', users);
app.get('/', function (req, res) {
  res.send('Hello, world!');
});
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});