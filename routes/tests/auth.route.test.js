const request = require('supertest')
const app = require('../../index')

describe('Auth Routes', () => {
	test('POST /register should return 422 if validation fails', async () => {
		const res = await request(app).post('/api/auth/register').send({})

		expect(res.statusCode).toBe(422)
		expect(res.body).toHaveProperty('error')
	})

	test('POST /login should return 200 on successful login', async () => {
		const res = await request(app).post('/api/auth/login').send({
			email: 'singh.mayank567@gmail.com',
			password: 'Password1#',
		})

		expect(res.statusCode).toBe(200)
	})
})
