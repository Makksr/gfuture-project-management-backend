const express = require('express')
const { AuthMiddleware, UploadMiddleware } = require('../middlewares')
const { TaskController } = require('../controllers')
const { TaskValidator, runValidation } = require('../validators')

const router = express.Router()

router.post(
	'/',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	UploadMiddleware.single('file'),
	TaskValidator.createValidator,
	runValidation,
	TaskController.createTask
)

router.get('/', AuthMiddleware.validateToken, AuthMiddleware.authMiddleware, TaskController.getTasks)

router.get(
	'/project/:projectId',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	TaskValidator.projectIdValidator,
	runValidation,
	TaskController.getTasksByProjectId
)

router.patch(
	'/:id/status',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	TaskValidator.idValidator,
	TaskValidator.statusValidator,
	runValidation,
	TaskController.updateStatus
)

router.get(
	'/:id',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	TaskValidator.idValidator,
	runValidation,
	TaskController.getTaskById
)

router.patch(
	'/:id',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	UploadMiddleware.single('file'),
	TaskValidator.idValidator,
	TaskValidator.updateValidator,
	runValidation,
	TaskController.updateTask
)

router.delete(
	'/:id',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	TaskValidator.idValidator,
	runValidation,
	TaskController.deleteTask
)

module.exports = router
