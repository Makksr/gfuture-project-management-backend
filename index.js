require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { AuthRoutes, ProjectRoutes, TaskRoutes } = require('./routes')

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/auth', AuthRoutes)
app.use('/api/projects', ProjectRoutes)
app.use('/api/tasks', TaskRoutes)

// Connect to MongoDB
mongoose
	.connect(process.env.DATABASE_URL, {})
	.then(() => {
		console.log('MongoDB Connected')
		if (process.env.NODE_ENV !== 'test') {
			app.listen(8000, () => console.log('Server running on port 8000'))
		}
	})
	.catch((err) => console.log(err))

module.exports = app
