const shortId = require('shortid')
const { UserSchema } = require('../models')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
	console.log('Register Data', req.body)
	const { name, email, password, role } = req.body
	const user = await UserSchema.findOne({ email }).exec()
	if (!user) {
		const token = jwt.sign({ name, email, password, role }, process.env.JWT_ACCOUNT_ACTIVATION, {
			expiresIn: '10m',
		})
		// placeholder for code to implement email token system

		// bypassing email verification , when email verification this code should be remove !!!!
		// const { name, email, password } = jwt.decode(token)
		const username = shortId.generate()
		const newUser = await new UserSchema({ username, name, email, password, role })

		try {
			await newUser.save()
			return res.json({
				message: 'Signup success. Please signin.',
			})
		} catch (err) {
			return res.status(401).json({
				error: 'Error saving user in database. Try signup again',
			})
		}
	} else {
		return res.status(401).json({
			error: 'Email is taken',
		})
	}
}

const registerActivate = (req, res) => {
	const { token } = req.body
	console.log(token)
	jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err) => {
		if (err) {
			console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err)
			return res.status(401).json({
				error: 'Expired link. Try again',
			})
		}
		const { name, email, password } = jwt.decode(token)
		console.log(name, email, password)
		const username = shortId.generate()
		const user = await UserSchema.findOne({ email }).exec()
		console.log('user', user)
		if (user) {
			return res.status(401).json({
				error: 'Email is taken',
			})
		}
		const newUser = await new UserSchema({ username, name, email, password })

		try {
			await newUser.save()
			return res.json({
				message: 'Signup success. Please signin.',
			})
		} catch (err) {
			return res.status(401).json({
				error: 'Error saving user in database. Try signup again',
			})
		}
	})
}

const login = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await UserSchema.findOne({ email }).exec()
		//user.password = password
		if (!user) {
			return res.status(400).json({
				error: 'User with that email does not exist. Please register',
			})
		}
		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: 'Email and password do not match',
			})
		}
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
		const { _id, name, role } = user
		return res.json({
			token,
			user: { _id, name, role },
		})
	} catch (err) {
		console.log(err)
		return res.status(400).json({
			error: 'Signin error. Try again',
		})
	}
}

module.exports = {
	login,
	register,
	registerActivate,
}
