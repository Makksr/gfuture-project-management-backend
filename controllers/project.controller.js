const { ProjectService } = require('../Services')

const createProject = async (req, res) => {
	try {
		const { title, description } = req.body
		const createdBy = req.user.id

		const project = await ProjectService.createProject({ title, description, createdBy })
		res.status(201).json(project)
	} catch (error) {
		res.status(500).json({ error: 'Error in create project' })
	}
}

const getProjects = async (req, res) => {
	try {
		const projects = await ProjectService.getAllProjects()
		res.json(projects)
	} catch (error) {
		res.status(500).json({ error: 'Error in fetching projects' })
	}
}

module.exports = {
	getProjects,
	createProject,
}
