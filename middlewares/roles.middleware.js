const { UserSchema } = require('../models')

exports.adminMiddleware = async (req, res, next) => {
	const adminUserId = req.user._id
	try {
		const user = await UserSchema.findById({ _id: adminUserId }).exec()
		if (!user) {
			return res.status(400).json({
				error: 'User not found',
			})
		}
		if (user.role !== 'admin') {
			return res.status(400).json({
				error: 'Admin resource. Access denied',
			})
		}
		req.profile = user
		next()
	} catch (err) {
		console.log(err)
	}
}
