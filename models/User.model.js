const mongoose = require('mongoose')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			max: 12,
			unique: true,
			index: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		hashed_password: {
			type: String,
			required: true,
		},
		salt: String,
		role: {
			type: String,
			default: 'user',
			enum: ['user', 'admin'],
		},
		resetPasswordLink: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
)

UserSchema.virtual('password')
	.set(function (password) {
		this._password = password
		this.salt = this.makeSalt()
		this.hashed_password = this.encryptPassword(password)
	})
	.get(function () {
		return this._password
	})

UserSchema.methods = {
	encryptPassword: function (password) {
		if (!password) return ''
		try {
			return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
		} catch (error) {
			return ''
		}
	},
	makeSalt: function () {
		return Math.round(new Date().valueOf() * Math.random()) + ''
	},
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password
	},
}

module.exports = mongoose.model('User', UserSchema)
