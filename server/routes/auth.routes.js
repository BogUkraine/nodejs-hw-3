const { Router } = require('express');
const {check, validationResult} = require('express-validator');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post(
    '/register',[
    check('login', 'Login must contain at least 3 symbols').isLength(3),
    check('password', 'Password must contain at least 6 symbols').isLength(6)
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in registration fields'
            });
        };

        const {login, password, role} = req.body;
        const candidate = await User.findOne({ login });
        if(candidate) {
            res.status(400).json('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ login, password: hashedPassword, role });
        await user.save();

        return res.status(201).json('User was successfully registered');
    }
    catch (error) {
        return res.status(500).json({message: 'User wasn\'t registered', error: error});
    };
});

router.post(
    '/login',[
    check('login', 'Login must contain at least 3 symbols').isLength(3),
    check('password', 'Password must contain at least 6 symbols').isLength(6)
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in login fields'
            });
        };

        const { login, password, role } = req.body;
        const user = await User.findOne({ login, role });
        if(!user) {
            return res.status(400).json({ message: "This user doesn't exist" });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        };

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );
        return res.status(201).json({ token, userId: user.id, login: user.login, role: user.role });
    }
    catch (error) {
        return res.status(500).json({message: 'User wasn\'t registered', error: error});
    };
});

module.exports = router;