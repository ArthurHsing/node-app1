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

const decrypt = (password, hash) => {
  return new Promise((res, rej) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) { rej(err); }
      res(result);
    });
  });
}
module.exports = {
  encrypt,
  decrypt
}