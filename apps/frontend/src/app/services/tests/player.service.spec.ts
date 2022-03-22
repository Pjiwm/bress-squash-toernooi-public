import {testPlayersExpert} from './mocks'
import { Player } from '../../../../../../libs/models'

const players = testPlayersExpert
const mockService = {
	getById(id: any) {
		return players.find((player) => player._id == id)
	},
	getAll() {
		return players
	},
	createPlayer(player: any) {
		players.push(player)
		return players
	},
	deletePlayer(id: any) {
		const index = players.findIndex(p => p._id === id)
		players.splice(index, 1)
		return {'status': 'removed'}
	}
}
describe('Player Service', () => {
  
	it('should get a list of players from getAll', () => {
		expect(mockService.getAll().length).toBeGreaterThan(2)
	})

	it('should get an individual player with a name and corresponding id from getById', () => {
		expect(mockService.getById('0')?._id).toBe('0')
		expect(mockService.getById('0')?.firstName !== undefined).toBeTruthy()
	})

	it('should create a new player with createPlayer', () => {
		const oldPlayerLength = mockService.getAll().length
		const newPlayer: Player = {_id: '30', firstName: 'Kanye', lastName: 'East', matchPoints: 0, setPoints: 0, totalScoredPoints: 0}
		mockService.createPlayer(newPlayer)
		const newPlayerLength = mockService.getAll().length
		expect(newPlayerLength).toBeGreaterThan(oldPlayerLength)
	})

	it('should remove a player with deletePlayer', () => {
		const oldPlayerLength = mockService.getAll().length
		mockService.deletePlayer('0')
		const newPlayerLength = mockService.getAll().length
		expect(newPlayerLength).toBeLessThan(oldPlayerLength)
	})
  
})