const { check, param } = require('express-validator')

const createUpdateValidator = [
	check('name').not().isEmpty().withMessage('Task name is required'),
	check('description').optional().isString(),
	check('project_id').isMongoId().withMessage('Invalid project ID'),
]

const idValidator = [param('id').isMongoId().withMessage('Invalid task ID')]
const projectIdValidator = [param('projectId').isMongoId().withMessage('Invalid project ID')]

const statusValidator = [check('status').isIn(['pending', 'inProgress', 'completed']).withMessage('Invalid status')]

module.exports = {
	createUpdateValidator,
	idValidator,
	projectIdValidator,
	statusValidator,
}
