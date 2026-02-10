const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, username, password, fullName, role, schoolInfo } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email or Username already exists' });
        }

        const user = new User({
            email,
            username,
            password,
            fullName,
            role: role || 'STUDENT',
            schoolInfo
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    fullName: user.fullName
                },
                token
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (user.status !== 'ACTIVE') {
            return res.status(403).json({ success: false, message: 'Account is suspended or inactive' });
        }

        user.lastLogin = Date.now();
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    fullName: user.fullName
                },
                token
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getMe = async (req, res) => {
    res.json({
        success: true,
        data: req.user
    });
};

module.exports = { register, login, getMe };
