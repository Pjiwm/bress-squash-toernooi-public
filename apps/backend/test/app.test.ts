import { app } from '../src/main'
import * as request from 'supertest'

describe('Api runs', () => {
	describe('should return a message on GET request /api', () => {

		test('should return a response code of 200', async () => {
			const response = await request(app).get('/api')
			expect(response.statusCode).toBe(200)
		})
	})
})
