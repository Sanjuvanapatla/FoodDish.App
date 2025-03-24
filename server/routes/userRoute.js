const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Send correct user details
        return res.status(201).json({ 
            message: 'User registered successfully', 
            user: { name: newUser.name, email: newUser.email, _id: newUser._id }
        });

    } catch (error) {
        console.error("Registration Error:", error); // Logs the actual error
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, userId: user._id, name: user.name });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
