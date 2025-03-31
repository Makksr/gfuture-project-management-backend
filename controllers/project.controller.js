const { ProjectService } = require('../Services')

const createProject = async (req, res) => {
	try {
		const { title, description } = req.body
		const createdBy = req.user.id

		const project = await ProjectService.createProject({ title, description, createdBy })
		res.status(201).json(project)
	} catch (error) {
		res.status(500).json({ error: 'Error creating project' })
	}
}

const getProjects = async (req, res) => {
	try {
		const projects = await ProjectService.getAllProjects()
		res.json(projects)
	} catch (error) {
		res.status(500).json({ error: 'Error fetching projects' })
	}
}

const getProjectById = async (req, res) => {
	try {
		const project = await ProjectService.getProjectById(req.params.id)
		if (!project) return res.status(404).json({ error: 'Project not found' })
		res.json(project)
	} catch (error) {
		res.status(500).json({ error: 'Error fetching project' })
	}
}

const updateProject = async (req, res) => {
	try {
		console.log(req.body)
		const project = await ProjectService.updateProject(req.params.id, req.body)
		if (!project) return res.status(404).json({ error: 'Project not found' })
		res.json(project)
	} catch (error) {
		res.status(500).json({ error: 'Error updating project' })
	}
}

const deleteProject = async (req, res) => {
	try {
		const project = await ProjectService.deleteProject(req.params.id)
		if (!project) return res.status(404).json({ error: 'Project not found' })
		res.json({ message: 'Project deleted successfully' })
	} catch (error) {
		res.status(500).json({ error: 'Error deleting project' })
	}
}

module.exports = {
	createProject,
	getProjects,
	getProjectById,
	updateProject,
	deleteProject,
}
