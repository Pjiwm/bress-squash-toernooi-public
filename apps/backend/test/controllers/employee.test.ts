import { app } from '../../src/main'
import * as request from 'supertest'
import { EmployeeModel } from '../../src/app/models/employee.model'

describe('Api runs', () => {
	describe('should return a list of employees on GET request /api/employee', () => {
		beforeEach(async () => {
			await EmployeeModel.collection.drop().catch(() => {
				console.log('Database is still empty!')
			})
		})

		// CREATE
		test('should return a response code of 201 with an a list with one person', async () => {
			const response = await request(app).post('/api/employee')
				.send({ email: 'Bob@gmail.com', isAdmin: false })
				.set('Accept', 'application/json')

			expect(response.statusCode).toBe(201)
			const employees = await EmployeeModel.find()
			expect(employees.length).toBe(1)
		})
		// READ
		test('should return a response code of 200 with an empty list', async () => {
			const response = await request(app).get('/api/employee')
			expect(response.statusCode).toBe(200)
			expect(response.body.length).toBe(0)
		})

		// UPDATE
		test('should return a response code of 200 with and update employees admin right from false to true', async () => {
			const newEmployee = new EmployeeModel({ email: 'bob@gmail.com', isAdmin: false })
			await newEmployee.save()
			const response = await request(app).put(`/api/employee/${newEmployee.id}`)
				.send({ isAdmin: true })
				.set('Accept', 'application/json')

			expect(response.statusCode).toBe(200)
			const employee = await EmployeeModel.findOne()
			expect(employee.isAdmin).toBe(true)
		})

		// DELETE
		test('should return a response code of 200 and after removing employee total employee count should be 0', async () => {
			const newEmployee = new EmployeeModel({ email: 'bob@gmail.com', isAdmin: false })
			await newEmployee.save()
			const response = await request(app).delete(`/api/employee/${newEmployee.id}`)

			expect(response.statusCode).toBe(200)
			const employees = await EmployeeModel.find()
			expect(employees.length).toBe(0)
		})
	})
})
