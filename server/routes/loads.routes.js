const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();
const auth = require('../middleware/auth.middleware');

router.post('/add', auth, async (req, res) => {
  try {
    // const id = req.user.userId;
    // const {form} = req.body;


    return res.status(201).json({message: 'Load was successfully created'});
  } catch (error) {
    return res.status(500).json({
      message: 'Load wasn\'t created', error: error,
    });
  }
});

module.exports = router;
