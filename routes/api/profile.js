const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');

router.get('/test', (req, res) => {
  res.json({ msg: "profile works" });
});
/**
 * $route POST api/profiles/add
 * $parameters 
 * $desc add profile
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const rqBody = req.body;
  const profileFields = {};
  for (let i in rqBody) {
    profileFields[i] = rqBody[i];
  }
  const newProfile = new Profile(profileFields);
  newProfile.save()
    .then(profile => {
      res.status(200).json({
        code: 1,
        message: 'Successfully added!',
        data: profile
      });
    }).catch(err => {
      throw err;
    });
});
module.exports = router;