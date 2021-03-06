const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const validate = require('../middleware/valid.middleware');
const userValid = require('../validation/auth.validation');

/**
 * @api {post} /api/auth/register register user
 * @apiName PostUser
 * @apiGroup auth
 *
 * @apiParam {String} login User's login.
 * @apiParam {String} password User's password.
 * @apiParam {String} role User's role.
 *
 * @apiSuccess {String} message User was successfully registered.
 *
 * @apiError UserAlreadyExists User already exists.
 * @apiError UserWasntRegistered User was not registered.
 */

router.post('/register', validate(userValid.register, 'body'),
    async (req, res) => {
      try {
        const {login, password, role} = req.body;
        const candidate = await User.findOne({login});
        if (candidate) {
          return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({login,
          password: hashedPassword, role, photo: null});
        await user.save();

        return res.status(201).json({
          message: 'User was successfully registered',
        });
      } catch (error) {
        return res.status(500).json({
          message: 'User wasn\'t registered', error: error,
        });
      };
    });

/**
 * @api {post} /api/auth/login login user
 * @apiName PostUser
 * @apiGroup auth
 *
 * @apiParam {String} login User's login.
 * @apiParam {String} password User's password.
 * @apiParam {String} role User's role.
 *
 * @apiSuccess {String} token User jwt.
 * @apiSuccess {String} userId User unique id.
 * @apiSuccess {String} login User login.
 * @apiSuccess {String} role User role: shipper or driver.
 *
 * @apiError UserDoesntExist This user doesn't exist.
 * @apiError UserWrongPassword Wrong password.
 * @apiError UserWasntLogined User wasn't logined.
 */

router.post('/login', validate(userValid.login, 'body'), async (req, res) => {
  try {
    const {login, password, role} = req.body;
    const user = await User.findOne({login, role});
    if (!user) {
      return res.status(400).json({message: 'This user doesn\'t exist'});
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Wrong password'});
    };

    const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'},
    );
    return res.status(201).json({
      token, userId: user.id, login: user.login, role: user.role,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'User wasn\'t logined', error: error,
    });
  };
});

module.exports = router;
