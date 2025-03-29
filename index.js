require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

mongoose
	.connect(process.env.DATABASE_URL, {})
	.then(() => {
		console.log('MongoDB Connected')
		app.listen(8000, () => console.log('Server running on port 8000'))
	})
	.catch((err) => console.log(err))
