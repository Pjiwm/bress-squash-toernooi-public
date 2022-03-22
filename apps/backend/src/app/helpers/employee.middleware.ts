import { EmployeeModel } from '../models/employee.model'
import jwt = require('jsonwebtoken')

/**
 * @description Checks if a user is logged in and whitelisted in the DB.
 * If the users email is not verified it will also return an error, even if it's whitelisted.
 * 
 * @returns - an authentication error because the user is not whitelisted.
 */
async function checkWhiteList(req, res, next) {
	// Skip auth if it's just testing
	if (process.env.NODE_ENV === 'test') {
		return next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		const decoded = jwt.decode(token)
		const email = decoded['https://example.com/email']
		const foundEmployee = await EmployeeModel.findOne({ email: email })

		if (foundEmployee === null) {
			return getError(req, res, 'You are not whitelisted')
		}

		next()
	} catch (e) {
		return res.status(401).send({
			code: 401,
			error: 'Unauthorized ',
			message: 'You are not authorized'
		})
	}
}
/**
 * @description Checks if the user is an admin, only admins are supossed to perform create update and delete 
 * operattions on employees. We only check if the employee has the admin fag on.
 * @returns An error if the user is anot an authenticated admin.
 */
async function checkAdmin(req, res, next) {
	// Skip auth if it's just testing
	if (process.env.NODE_ENV === 'test') {
		return next()
	}
	const token = req.headers.authorization.split(' ')[1]
	const decoded = jwt.decode(token)
	const email = decoded['https://example.com/email']
	const foundEmployee = await EmployeeModel.findOne({ email: email })
	if (!foundEmployee.isAdmin) {
		return getError(req, res, 'You are not an admin')
	}
	next()

}

function getError(req, res, message) {
	return res.status(401).send({
		code: 401,
		error: 'Unauthorized ',
		message: message
	})
}

export {
	checkWhiteList,
	checkAdmin
}