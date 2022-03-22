import {testTournaments} from './mocks'

const mockService = {
	getById(id: any) {
		return testTournaments.find((tournament) => tournament._id == id)
	},
	getAll() {
		return testTournaments
	}
}
describe('Tournament Service', () => {
  
	it('should get 2 tournaments from getAll', () => {
		expect(mockService.getAll().length).toBe(2)

	})

	it('should get a tournament with the id of 0 from getById', () => {
		expect(mockService.getById('0')?._id).toBe('0')
	})

	it('should get a tournament with mulitple divisions which contain multiple players from getById', () => {
		expect(mockService.getById('0')?.divisions.length).toBeGreaterThan(1)
		expect(mockService.getById('0')?.divisions[0].players?.length).toBeGreaterThan(1)
	})
  
})