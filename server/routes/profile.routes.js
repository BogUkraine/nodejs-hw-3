const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const validate = require('../middleware/valid.middleware');
const validProfile = require('../validation/profile.validation');

//* **** GET ******//

router.get('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const jwtId = req.user.userId;
    if (id !== jwtId) {
      return res.status(400).json({message: 'User is not authorized'});
    }

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

router.put('/:id/photo',
    auth, upload.single('userPhoto'), async (req, res) => {
      try {
        console.log(req.file, req.body.userPhoto);
        const id = req.params.id;
        const jwtId = req.user.userId;
        if (id !== jwtId) {
          return res.status(401).json({message: 'User is not authorized'});
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
