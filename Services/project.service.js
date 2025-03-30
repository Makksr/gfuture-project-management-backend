const { ProjectSchema, TaskSchema } = require('../models')

const createProject = async ({ title, description, createdBy }) => {
	return await ProjectSchema.create({ title, description, createdBy })
}

const getAllProjects = async () => {
	return await ProjectSchema.find().populate('createdBy', 'name email')
}

const getProjectById = async (projectId) => {
	const project = await ProjectSchema.findById(projectId).populate('createdBy', 'name email')
	if (!project) return null

	const tasks = await TaskSchema.find({ project: projectId })

	return { ...project.toObject(), tasks }
}

const updateProject = async (id, updateData) => {
	return await ProjectSchema.findByIdAndUpdate(id, updateData, { new: true })
}

const deleteProject = async (id) => {
	return await ProjectSchema.findByIdAndDelete(id)
}

module.exports = {
	createProject,
	getAllProjects,
	getProjectById,
	updateProject,
	deleteProject,
}
