const express = require('express');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no prfile for this user' });
		}

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post(
	'/',
	auth,
	[
		check('status', 'Status is required').notEmpty(),
		check('skills', 'Skills is required').notEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			twitter,
			facebook,
			linkedin,
			instagram
		} = req.body;
		const profileObject = {};

		profileObject.user = req.user.id;
		if (company) profileObject.company = company;
		if (website) profileObject.website = website;
		if (location) profileObject.location = location;
		if (status) profileObject.status = status;
		if (skills) {
			profileObject.skills = skills.split(',').map(skill => skill.trim());
		}
		if (bio) profileObject.bio = bio;
		if (githubusername) profileObject.githubusername = githubusername;
		profileObject.social = {};
		if (youtube) profileObject.social.youtube = youtube;
		if (twitter) profileObject.social.twitter = twitter;
		if (facebook) profileObject.social.facebook = facebook;
		if (linkedin) profileObject.social.linkedin = linkedin;
		if (instagram) profileObject.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			// Update
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					profileObject,
					{ new: true }
				);

				return res.json(profile);
			}

			// Create
			profile = new Profile(profileObject);
			profile.save();
			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route  GET api/profile/:id
// @desc   Get profile by user id
// @access Public
router.get('/:id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.id
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found' });
		}

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		if (error.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route  DELETE api/profile
// @desc   Delete profile, user & posts by user id
// @access Private
router.delete('/', auth, async (req, res) => {
	try {
		// Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove user
		await User.findOneAndRemove({ _id: req.user.id });
		// Remove posts

		res.json({ msg: 'User deleted' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private
router.put(
	'/experience',
	auth,
	[
		check('title', 'Title is required').notEmpty(),
		check('company', 'Company is required').notEmpty(),
		check('from', 'Initial date is required').notEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		} = req.body;

		const experience = {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			if (!profile) {
				return res.status(400).send({ msg: 'Profile not found' });
			}

			profile.experience.unshift(experience);
			await profile.save();
			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route  DELETE api/profile/experience/:id
// @desc   Add profile experience
// @access Private
router.delete('/experience/:id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const removeIndex = profile.experience
			.map(item => item.id)
			.indexOf(req.params.id);

		profile.experience.splice(removeIndex);
		await profile.save();
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route  PUT api/profile/education
// @desc   Add profile education
// @access Private
router.put(
	'/education',
	auth,
	[
		check('school', 'School is required').notEmpty(),
		check('degree', 'Degree is required').notEmpty(),
		check('fieldofstudy', 'Field of study is required').notEmpty(),
		check('from', 'Initial date is required').notEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}

		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		} = req.body;

		const education = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			if (!profile) {
				return res.status(400).send({ msg: 'Profile not found' });
			}

			profile.education.unshift(education);
			await profile.save();
			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route  DELETE api/profile/education/:id
// @desc   Add profile education
// @access Private
router.delete('/education/:id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const removeIndex = profile.education
			.map(item => item.id)
			.indexOf(req.params.id);

		profile.education.splice(removeIndex);
		await profile.save();
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route  GET api/profile/github/:username
// @desc   Get Github repos
// @access Public
router.get('/github/:username', async (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=5&sort=created:asc&client_id=${config.get(
				'githubClientId'
			)}&client_secret=${config.get('githubClientSecret')}`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' }
		};

		request(options, (error, response, body) => {
			if (error) console.error(error);
			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'No Github profile found' });
			}
			res.json(JSON.parse(body));
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
