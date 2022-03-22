import { Division } from '../../../../../../libs/models'
import {testDivisions} from './mocks'

const divisions = testDivisions
const mockService = {
    
	getById(id: any) {
		return divisions.find((division) => division._id == id)
	},
	getAll() {
		return divisions
	},
	create(division: any) {
		divisions.push(division)
		return division
	},
	update(division: any, id: any) {
		const index = divisions.findIndex((_division) => _division?._id === id)
		divisions[index] = division
		return divisions[index]
	}
}

describe('Division Service', () => {
  
	it('should have one more division after adding one with create', () => {
		const beforeLength = mockService.getAll().length
		const newDivision: Division = { name: 'intermediate', _id: '10'}
        
		mockService.create(newDivision)
		const afterLength = mockService.getAll().length
		expect(afterLength).toBeGreaterThan(beforeLength)
	})

	it('should be able to update one Divisions name with update', () => {
		const oldName = mockService.getById('0')?.name
		const updatedValues = {name: 'pros'}
		mockService.update(updatedValues, '0')
		const newName = mockService.getById('1')?.name
		expect(newName === oldName).toBeFalsy()
	})

	it('should get a list of Division from getAll', () => {
		expect(mockService.getAll().length).toBeGreaterThan(1)
	})

	it('should get one Division with the correct id from getById', () => {
		expect(mockService.getById('0')?._id).toBe('0')
	})
})