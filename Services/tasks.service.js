const { TaskSchema } = require('../models')

const createTask = async ({ name, description, file, project_id }) => {
	return await TaskSchema.create({ name, description, file, project_id })
}

const getAllTasks = async () => {
	return await TaskSchema.find().populate('project', 'title')
}

const getTasksByProjectId = async (projectId) => {
	return await TaskSchema.find({ project_id: projectId }).populate('project_id', 'title')
}
const getTasksById = async (id) => {
	return await TaskSchema.findById(id).populate('createdBy', 'name email')
}

const updateTask = async (id, updateData) => {
	return await TaskSchema.findByIdAndUpdate(id, updateData, { new: true })
}
const updateTaskStatus = async (id, status) => {
	return await TaskSchema.findByIdAndUpdate(id, { status }, { new: true })
}

const deleteTask = async (id) => {
	return await TaskSchema.findByIdAndDelete(id)
}

module.exports = {
	createTask,
	getAllTasks,
	getTasksByProjectId,
	updateTask,
	deleteTask,
	getTasksById,
	updateTaskStatus,
}
