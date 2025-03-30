const express = require('express')
const { AuthMiddleware, RolesMiddleware } = require('../middlewares')
const { ProjectController } = require('../controllers')

const router = express.Router()

router.post(
	'/',
	AuthMiddleware.validateToken,
	AuthMiddleware.authMiddleware,
	RolesMiddleware.adminMiddleware,
	ProjectController.createProject
)
router.get('/', AuthMiddleware.validateToken, AuthMiddleware.authMiddleware, ProjectController.getProjects)

module.exports = router
