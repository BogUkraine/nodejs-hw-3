const { Router } = require('express');
const {check, validationResult} = require('express-validator');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.middleware');

router.put('/password', 
    auth, 
    [check('password', 'Password must contain at least 6 symbols').isLength(6)],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data in field'
                });
            };

            const password = req.body.password;
            const id = req.user.userId;

            const hashedPassword = await bcrypt.hash(password, 12);

            User.findByIdAndUpdate(id, {password: hashedPassword}, (err) => {
                if(err) {
                    return res.status(500).json({message: 'Password wasn\'t changed', err});
                }
                return res.status(201).json({message: 'Password was successfully changed'});
            });
        }
        catch (error) {
            return res.status(500).json({message: 'Password wasn\'t changed', error: error});
        };
});

router.delete('/delete', 
    auth, 
    async (req, res) => {
        try {
            const id = req.user.userId;
            User.findByIdAndDelete(id, (err) => {
                if(err) {
                    return res.status(500).json({message: 'User wasn\'t deleted', err});
                }
                return res.status(201).json({message: 'User was successfully deleted'});
            });
        }
        catch (error) {
            return res.status(500).json({message: 'User wasn\'t deleted', error: error});
        };
});
router.put('/photo', 
    auth, 
    async (req, res) => {
        try {
            const id = req.user.userId;
            const {value, size} = req.body;
            console.log(value,size);

            if(size > 2048) {
                return res.status(400).json({message: 'Photo weight must be less than 2 MB'})
            };

            User.findByIdAndUpdate(id, {photo: value}, (err) => {
                if(err) {
                    return res.status(500).json({message: 'Photo wasn\'t updated', err});
                }
                return res.status(201).json({message: 'Photo was successfully updated'});
            });
        }
        catch (error) {
            return res.status(500).json({message: 'Photo wasn\'t updated', error: error});
        };
});

module.exports = router;