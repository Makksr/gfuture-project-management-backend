const { ProjectSchema } = require('../models')

const createProject = async ({ title, description, createdBy }) => {
	return await ProjectSchema.create({ title, description, createdBy })
}

const getAllProjects = async () => {
	return await ProjectSchema.find().populate('createdBy', 'name email')
}

module.exports = {
	createProject,
	getAllProjects,
}
