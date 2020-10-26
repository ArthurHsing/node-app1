const bcrypt = require('bcrypt');
const encrypt = (password) => {
  return new Promise((res, rej) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) { rej(err); }
        res(hash);
      });
    });
  });
}
module.exports = {
  encrypt
}