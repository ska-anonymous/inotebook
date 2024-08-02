const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = require('../jwtKey');
const verifyUserToken = require('../middleware/verifyUserToken');

// ##################--------------- ROUTE 1 --------------##############

// create a user using POST --- /api/auth/createuser --- no login required
router.post('/createuser', [
    body('name', 'Enter a valid name, at least 3 and atmost 15 characters').isLength({ min: 3, max: 15 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password, at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, errorsBody: errors.array() });
    }

    // check if user with the give email already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.json({ error: true, errorMessage: `User with this email "${req.body.email}" already exists` });
    }

    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = User({ ...req.body, password: securedPassword });
    newUser.save().then(user => {
        console.log('user created', user);

        const payload = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(payload, secretKey);

        res.json({ error: false, token });
    }).catch(err => {
        res.json({ error: true, errorMessage: 'Internal Server Error! Please try again later' });
    });
})

// ##################--------------- ROUTE 2 --------------##############

// authenticate a user using POST --- /api/auth/login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').notEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, errorsBody: errors.array() });
    }

    const { email, password } = req.body;
    // first check if the user exists
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: true, errorMessage: 'Incorrect Login Credentials' });
        }

        // now check if the password is correct
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.json({ error: true, errorMessage: 'Incorrect Login Credentials' });
        }

        // now user is authenticated so create and send token
        const payload = {
            user: {
                id: user.id,
            }
        }

        const token = jwt.sign(payload, secretKey);
        res.json({ error: false, token });


    } catch (err) {
        res.json({ error: true, errorMessage: 'Internal Server Error' });
    }

})


// ##################--------------- ROUTE 3 --------------##############

// get loggedin user details using get /api/auth/getuser ---- login required
router.get('/getuser', verifyUserToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select('-password');
        res.json(user);
    } catch (err) {
        res.json({ error: true, errorMessage: 'Internal Server Error' });
    }
})


module.exports = router;