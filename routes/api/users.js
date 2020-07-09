const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

const router = express.Router();

// @route  POST api/users
// @desc   Register user & get token
// @access Public
router.post(
	'/',
	[
		check('name', 'Name is required').notEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Plase enter a password with six or more characters'
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		const { name, email, password } = req.body;

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			// User exists
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			// Get gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			user = new User({
				name,
				email,
				avatar,
				password
			});

			// Encrypt password
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);
			await user.save();

			// Return JWT
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 3600000 },
				(error, token) => {
					if (error) throw error;
					res.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
