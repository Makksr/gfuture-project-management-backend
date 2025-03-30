const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Project', ProjectSchema)
