const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth.middleware');

const validate = require('../middleware/valid.middleware');
const validProfile = require('../validation/profile.validation');

//* **** GET ******//

router.get('/', auth, async (req, res) => {
  try {
    User.find({}, (error) => {
      if (error) {
        return res.status(500).json({message: 'Can not get profiles', error});
      }
      return res.status(201).json({message: 'Profiles was got'});
    });
  } catch (error) {
    return res.status(500).json({message: 'Can not get profiles', error});
  }
});

router.get('/:id',
    auth,
    async (req, res) => {
      try {
        const id = req.params.id;

        User.findById(id, (err) => {
          if (err) {
            return res.status(500).json({message: 'Can not get profile', err});
          }
          return res.status(200).json({message: 'Profile was got'});
        });
      } catch (error) {
        return res.status(500).json({
          message: 'Can not get profile', error: error,
        });
      }
    });

//* **** PUT ******//

router.put('/:id/password',
    auth, validate(validProfile.password, 'body'),
    async (req, res) => {
      try {
        const id = req.params.id;
        const jwtId = req.user.userId;
        if (id !== jwtId) {
          return res.status(400).json({message: 'User is not authorized'});
        }

        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 12);

        User.findByIdAndUpdate(id, {
          $set: {password: hashedPassword},
        }, (err) => {
          if (err) {
            return res.status(500).json({
              message: 'Profile data wasn\'t changed', err,
            });
          }
          return res.status(200).json({
            message: 'Profile data was successfully changed',
          });
        });
      } catch (error) {
        return res.status(500).json({
          message: 'Profile data wasn\'t changed', error: error,
        });
      }
    });

router.put('/:id/profilePhoto', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const jwtId = req.user.userId;
    if (id !== jwtId) {
      return res.status(400).json({message: 'User is not authorized'});
    }
    return res.status(400).json({message: 'User is not authorized'});
  } catch (error) {
    return res.status(500).json({
      message: 'Profile data wasn\'t changed', error: error,
    });
  }
});

//* **** POST ******//

//* **** DELETE ******//

router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const jwtId = req.user.userId;
    if (id !== jwtId) {
      return res.status(400).json({message: 'User is not authorized'});
    }

    User.findByIdAndDelete(id, (err) => {
      if (err) {
        return res.status(500).json({message: 'User wasn\'t deleted', err});
      }
      return res.status(200).json({message: 'User was successfully deleted'});
    });
  } catch (error) {
    return res.status(500).json({
      message: 'User wasn\'t deleted', error: error,
    });
  }
});

module.exports = router;
