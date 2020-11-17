const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');

router.get('/test', (req, res) => {
  res.json({ msg: "profile works" });
});
/**
 * $route POST api/profiles/add
 * $parameters 查看Profile.js文件
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
/**
 * $route GET api/profiles
 * $parameters 获取所有的profiles
 * $desc get profiles
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.find({})
    .then(profiles => {
      res.status(200).json({ code: 1, message: 'success', data: profiles });
    })
    .catch(err => {
      throw err;
    });
});

/**
 * $route GET api/profiles/:id
 * $parameters 获取所有的profiles
 * $desc get profiles
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .then(profiles => {
      res.status(200).json({ code: 1, message: 'success', data: profiles });
    })
    .catch(err => {
      throw err;
    });
});

/**
 * $route GET api/profiles/edit/:id
 * $parameters 获取所有的profiles
 * $desc get profiles
 */
router.post('/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {};
    const requestBody = req.body;
    for (let i in requestBody) {
      profileFields[i] = requestBody[i];
    }
    Profile
      .findOneAndUpdate({ _id: req.params.id }, profileFields)
      .then(file => {
        res.status(200).json({
          code: 1,
          message: 'Modify successfully!',
          data: profileFields
        });
      });
  });

/**
 * $route GET api/profiles/delete/:id
 * $parameters 获取所有的profiles
 * $desc get profiles
 */
router.delete('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // console.log(req.params.id);
    Profile.findOneAndRemove({ _id: req.params.id })
      .then(profileDoc => {
        if (!profileDoc) { return res.status(200).json({ code: 0, message: 'Profile dose not exist!' }) }
        res.status(200).json({ code: 1, message: 'Successfully delete!', data: profileDoc });
        console.log(profileDoc);
      }).catch(err => {
        throw err;
      })
  });
module.exports = router;