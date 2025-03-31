const { check, param } = require('express-validator')

const createValidator = [
	check('title').not().isEmpty().withMessage('Title is required'),
	check('description').optional().isString(),
]

const updateValidator = [check('title').optional().isString(), check('description').optional().isString()]

const idValidator = [param('id').isMongoId().withMessage('Invalid project ID')]

module.exports = {
	createValidator,
	updateValidator,
	idValidator,
}
