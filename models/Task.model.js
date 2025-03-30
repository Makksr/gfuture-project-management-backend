const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		status: { type: String, enum: ['pending', 'inProgress', 'completed'], default: 'pending' },
		file: { type: String },
		project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema)
