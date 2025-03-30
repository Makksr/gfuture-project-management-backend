const { check, param } = require('express-validator')

const createUpdateValidator = [
	check('title').not().isEmpty().withMessage('Title is required'),
	check('description').optional().isString(),
]

const idValidator = [param('id').isMongoId().withMessage('Invalid project ID')]

module.exports = {
	createUpdateValidator,
	idValidator,
}
