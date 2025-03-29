const { expressjwt: expressJwt } = require('express-jwt')
const { UserSchema } = require('../models')

exports.validateToken = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
	userProperty: 'auth',
	getToken: (req) => {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			return req.headers.authorization.split(' ')[1]
		}
		return null
	},
})

exports.authMiddleware = async (req, res, next) => {
	try {
		if (!req.auth) {
			throw new Error('Not Authenticated')
		}
		const authUserId = req.auth._id
		const user = await UserSchema.findById({ _id: authUserId }).exec()
		if (!user) throw new Error('User Not found')
		req.user = user
		next()
	} catch (err) {
		console.error(err)
		res.status(400).json({
			error: 'User not found',
		})
	}
}
