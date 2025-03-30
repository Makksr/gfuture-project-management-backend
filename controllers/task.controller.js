const { TaskService } = require('../Services')

const createTask = async (req, res) => {
	try {
		const { name, description, project_id } = req.body
		const file = req.file ? req.file.filename : null

		const task = await TaskService.createTask({ name, description, file, project_id })
		res.status(201).json(task)
	} catch (error) {
		res.status(500).json({ error: 'Error creating task' })
	}
}

const getTasks = async (req, res) => {
	try {
		const tasks = await TaskService.getAllTasks()
		res.json(tasks)
	} catch (error) {
		res.status(500).json({ error: 'Error fetching tasks' })
	}
}

const getTasksByProjectId = async (req, res) => {
	try {
		const tasks = await TaskService.getTasksByProjectId(req.params.projectId)
		res.json(tasks)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Error fetching tasks' })
	}
}

const getTaskById = async (req, res) => {
	try {
		const project = await TaskService.getTasksById(req.params.id)
		if (!project) return res.status(404).json({ error: 'Tasks not found' })
		res.json(project)
	} catch (error) {
		res.status(500).json({ error: 'Error fetching project' })
	}
}

const updateTask = async (req, res) => {
	try {
		const { name, description } = req.body
		const file = req.file ? req.file.filename : undefined

		const updatedTask = await TaskService.updateTask(req.params.id, { name, description, file })
		if (!updatedTask) return res.status(404).json({ error: 'Task not found' })
		res.json(updatedTask)
	} catch (error) {
		res.status(500).json({ error: 'Error updating task' })
	}
}

const updateStatus = async (req, res) => {
	try {
		const { id } = req.params
		const { status } = req.body

		const updatedTask = await TaskService.updateTaskStatus(id, status)
		if (!updatedTask) {
			return res.status(404).json({ error: 'Task not found' })
		}

		res.json(updatedTask)
	} catch (error) {
		res.status(500).json({ error: 'Error updating task status' })
	}
}

const deleteTask = async (req, res) => {
	try {
		const task = await TaskService.deleteTask(req.params.id)
		if (!task) return res.status(404).json({ error: 'Task not found' })
		res.json({ message: 'Task deleted successfully' })
	} catch (error) {
		res.status(500).json({ error: 'Error deleting task' })
	}
}

module.exports = {
	createTask,
	getTasks,
	getTasksByProjectId,
	updateTask,
	deleteTask,
	getTaskById,
	updateStatus,
}
