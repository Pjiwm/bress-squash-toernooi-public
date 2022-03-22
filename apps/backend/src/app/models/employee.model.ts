import { Document, Schema, model } from 'mongoose'

// Create interface
export interface IEmployee extends Document {
  email: string
  isAdmin: boolean
}

const EmployeeSchema = new Schema({
	email: {
		type: 'string',
		required: [true, 'Email is required.'],
		index: true,
		unique: true
	},
	isAdmin: {
		type: Boolean,
		required: [true, 'Employee role is required.'],
	},
})

EmployeeSchema.post('save', function (error, doc, next) {
	if (error.name === 'MongoServerError' && error.code === 11000) {
		const err = new Error('Email already in use. Choose another email.')
		next(err)
	} else {
		next()
	}
})

// export default getModel('employee', EmployeeSchema)
export const EmployeeModel = model<IEmployee>('employee', EmployeeSchema)