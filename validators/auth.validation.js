const { check } = require('express-validator')

const userRegisterValidator = [
	check('name').not().isEmpty().withMessage('Name is required'),
	check('email').not().isEmpty().isEmail().withMessage('Must be a valid email address'),
	check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
	check('role').not().isEmpty().withMessage('Role is required'),
]
const userLoginValidator = [
	check('email').isEmail().withMessage('Must be a valid email address'),
	check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

module.exports = {
	userRegisterValidator,
	userLoginValidator,
}
