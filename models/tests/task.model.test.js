const SequelizeMock = require('sequelize-mock')
const dbMock = new SequelizeMock()
const Task = dbMock.define('Task', {
	name: 'Test Task',
	status: 'pending',
})

describe('Task Model', () => {
	test('creates a new task', async () => {
		const task = await Task.create({ name: 'New Task', status: 'pending' })

		expect(task.name).toBe('New Task')
		expect(task.status).toBe('pending')
	})
})
