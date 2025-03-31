const { check, param } = require('express-validator')

const createValidator = [
	check('name').not().isEmpty().withMessage('Task name is required'),
	check('description').optional().isString(),
	check('project_id').isMongoId().withMessage('Invalid project ID'),
]

const updateValidator = [check('name').not().optional(), check('description').optional().isString()]

const idValidator = [param('id').isMongoId().withMessage('Invalid task ID')]
const projectIdValidator = [param('projectId').isMongoId().withMessage('Invalid project ID')]

const statusValidator = [check('status').isIn(['pending', 'inProgress', 'completed']).withMessage('Invalid status')]

module.exports = {
	createValidator,
	idValidator,
	projectIdValidator,
	statusValidator,
	updateValidator,
}
