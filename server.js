const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI; //mongodb的uri
const app = express();
const port = process.env.PORT || 5000;
/**
 * 测试
 */
app.get('/', function (req, res) {
  res.send('Hello, world!');
});
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  console.log('Mongodb connected!');
}).catch(err => {
  console.log(err);
})
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});