const express = require('express')
const { AuthMiddleware, RolesMiddleware } = require('../middlewares')
const { ProjectController } = require('../controllers')
const { ProjectValidator, runValidation } = require('../validators')

const router = express.Router()

router.post(
	'/',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	RolesMiddleware.adminMiddleware,
	ProjectValidator.createUpdateValidator,
	runValidation,
	ProjectController.createProject
)

router.get('/', AuthMiddleware.validateToken, AuthMiddleware.authMiddleware, ProjectController.getProjects)

router.get(
	'/:id',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	ProjectValidator.idValidator,
	runValidation,
	ProjectController.getProjectById
)

router.patch(
	'/:id',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	RolesMiddleware.adminMiddleware,
	ProjectValidator.idValidator,
	ProjectValidator.createUpdateValidator,
	runValidation,
	ProjectController.updateProject
)

router.delete(
	'/:id',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	RolesMiddleware.adminMiddleware,
	ProjectValidator.idValidator,
	runValidation,
	ProjectController.deleteProject
)

module.exports = router
