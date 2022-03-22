import { 
	Tournament, 
	Player, 
	Pool, 
	Division, 
	/*PoolMatch,*/ 
	Match, 
	KnockoutMatch
} from '../../../../libs/models'
import {	tournamentGenerator} from '../../src/app/services/tournament.service'

describe('Tournament generator', () => {
	describe('Generatepools', () => {
		test('GeneratePools should return 1 pools with size 7 when given 7 players', () => {
			//Assign
			const players: Player[] = [
				{ firstName: 'Jan', lastName: 'Janssen',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'John', lastName: 'Doe',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Pim', lastName: 'Munne',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Joe', lastName: 'Johnsson',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Mo', lastName: 'Gallad',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Maarten', lastName: 'De Zwart',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Melvin', lastName: 'Giebels',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
			]

			//Act
			const sut = tournamentGenerator.generatePools(players)
			//Assert
			expect(sut.length).toBe(1)
			expect(sut[0].players.length).toBe(7)
		})
		test('GeneratePools should return 2 pools with 1 having 5 and 1 having 6 when given 11 players', () => {
			//Assign
			const players: Player[] = [
				{ firstName: 'Jan', lastName: 'Janssen',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'John', lastName: 'Doe',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Pim', lastName: 'Munne',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Joe', lastName: 'Johnsson',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Mo', lastName: 'Gallad',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Maarten', lastName: 'De Zwart',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Melvin', lastName: 'Giebels',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Pieter', lastName: 'Bakker',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Stijn', lastName: 'van Houwelingen',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Robin', lastName: 'Schellius',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
				{ firstName: 'Sies', lastName: 'De Witte',matchPoints: 0,setPoints: 0,totalScoredPoints: 0},
			]
			//Act
			const sut = tournamentGenerator.generatePools(players)
			//Assert
			expect(sut.length).toBe(2)
			expect(sut[0].players.length).toBe(5)
			expect(sut[1].players.length).toBe(6)
		})
		test('GeneratePools should return 3 pools with 1 having 4, 2 having 5 and 3 having 5 when given 14 players', () => {
			//Assign
			const players: Player[] = [
				{ firstName: 'Jan', lastName: 'Janssen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'John', lastName: 'Doe', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pim', lastName: 'Munne', matchPoints: 0,setPoints: 0,totalScoredPoints: 0  },
				{ firstName: 'Joe', lastName: 'Johnsson', matchPoints: 0,setPoints: 0,totalScoredPoints: 0  },
				{ firstName: 'Mo', lastName: 'Gallad', matchPoints: 0,setPoints: 0,totalScoredPoints: 0  },
				{ firstName: 'Maarten', lastName: 'De Zwart', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Melvin', lastName: 'Giebels', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pieter', lastName: 'Bakker', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Robin', lastName: 'Schellius', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Sies', lastName: 'De Witte', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Davide', lastName: 'Ambesi', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Dion', lastName: 'Koeze', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Arno', lastName: 'Broeders', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
			]

			//Act
			const sut = tournamentGenerator.generatePools(players)
			//Assert
			expect(sut.length).toBe(3)
			expect(sut[0].players.length).toBe(4)
			expect(sut[1].players.length).toBe(5)
			expect(sut[1].players.length).toBe(5)
		})
	})
	describe('GenerateMatches', () => {
		test('GeneratePools should return 3 pools with 1 having 4, 2 having 5 and 3 having 5 when given 14 players', () => {
			//Assign
			const players: Player[] = [
				{ firstName: 'Jan', lastName: 'Janssen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'John', lastName: 'Doe', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pim', lastName: 'Munne', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Joe', lastName: 'Johnsson', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Mo', lastName: 'Gallad', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Maarten', lastName: 'De Zwart', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Melvin', lastName: 'Giebels', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pieter', lastName: 'Bakker', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
			]
			const pool1: Pool = {
				poolNr: 3, matches: [], players: [
					{ firstName: 'Jan', lastName: 'Janssen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'John', lastName: 'Doe', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Pim', lastName: 'Munne', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Joe', lastName: 'Johnsson', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Mo', lastName: 'Gallad', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },]
			}
			const pool2: Pool = {
				poolNr: 4, matches: [], players: [
					{ firstName: 'Maarten', lastName: 'De Zwart', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Melvin', lastName: 'Giebels', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Pieter', lastName: 'Bakker', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },]
			}
			const division: Division = { name: 'beginners', players: players, pools: [pool1, pool2] } as Division
			//Act
			const sut = tournamentGenerator.generateMatchesInPool(division)
			//Assert
			expect(sut.pools[0].matches.length).toBe(10)
			expect(sut.pools[1].matches.length).toBe(6)
		})
		test('GeneratePools should return 3 pools with 1 having 4, 2 having 5 and 3 having 5 when given 14 players', () => {
			//Assign
			const players: Player[] = [
				{ firstName: 'Jan', lastName: 'Janssen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'John', lastName: 'Doe', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pim', lastName: 'Munne', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Joe', lastName: 'Johnsson', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Mo', lastName: 'Gallad', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Maarten', lastName: 'De Zwart', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Melvin', lastName: 'Giebels', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pieter', lastName: 'Bakker', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Robin', lastName: 'Schellius', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Sies', lastName: 'De Witte', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Davide', lastName: 'Ambesi', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
			]
			const pool1: Pool = {
				poolNr: 3, matches: [], players: [
					{ firstName: 'Jan', lastName: 'Janssen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'John', lastName: 'Doe', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Pim', lastName: 'Munne', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Joe', lastName: 'Johnsson', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Mo', lastName: 'Gallad', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Robin', lastName: 'Schellius', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },]
			}
			const pool2: Pool = {
				poolNr: 4, matches: [], players: [
					{ firstName: 'Maarten', lastName: 'De Zwart', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Melvin', lastName: 'Giebels', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Pieter', lastName: 'Bakker', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Sies', lastName: 'De Witte', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },]
			}

			const division: Division = { name: 'beginners', players: players, pools: [pool1, pool2] } as Division
			//Act
			const sut = tournamentGenerator.generateMatchesInPool(division)
			//Assert
			expect(sut.pools[0].matches.length).toBe(15)
			expect(sut.pools[1].matches.length).toBe(10)
		})
	}),
	describe('GenerateQueue', () => {
		test('GenerateQueue should return 1 queue ', () => {
			//Assign
			const players: Player[] = [
				{ firstName: 'Jan', lastName: 'Janssen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'John', lastName: 'Doe', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pim', lastName: 'Munne', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Joe', lastName: 'Johnsson', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Mo', lastName: 'Gallad', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Maarten', lastName: 'De Zwart', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Melvin', lastName: 'Giebels', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pieter', lastName: 'Bakker', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Robin', lastName: 'Schellius', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Sies', lastName: 'De Witte', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Davide', lastName: 'Ambesi', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p1', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p2', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p3', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p4', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p5', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p6', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p7', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p8', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p9', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p10', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
			]
			const pool1: Pool = {
				poolNr: 3, matches: [], players: [
					{ firstName: 'Jan', lastName: 'Janssen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'John', lastName: 'Doe', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Pim', lastName: 'Munne', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Joe', lastName: 'Johnsson', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Mo', lastName: 'Gallad', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Robin', lastName: 'Schellius', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },]
			}
			const pool2: Pool = {
				poolNr: 4, matches: [], players: [
					{ firstName: 'Maarten', lastName: 'De Zwart', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Melvin', lastName: 'Giebels', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Pieter', lastName: 'Bakker', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Sies', lastName: 'De Witte', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },]
			}

			const division1: Division = { name: 'beginners', players: players, pools: [pool1, pool2] } as Division

			const pool3: Pool = {
				poolNr: 5, matches: [], players: [
					{ firstName: 'p1', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p2', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p3', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p4', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p5', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				]
			}
			const pool4: Pool = {
				poolNr: 6, matches: [], players: [
					{ firstName: 'p6', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p7', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p8', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p9', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p10', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				]
			}
			const division2: Division = { name: 'gevordenen', players: players, pools: [pool3, pool4] } as Division
			//Act
			const newDivision1 = tournamentGenerator.generateMatchesInPool(division1)
			const newDivision2 = tournamentGenerator.generateMatchesInPool(division2)
			//Assign
			const tournament: Tournament = { name: 'fit, fun friends Tournament', divisions: [newDivision1, newDivision2], date: new Date('2022-01-16') }
			//Act
			const queue = tournamentGenerator.generateQueueForPool(tournament)
			const queueArray = queue.toArray()
			//Assert
			expect(division1.pools[0].matches.length).toBe(15)
			expect(division1.pools[1].matches.length).toBe(10)
			expect(division2.pools[0].matches.length).toBe(10)
			expect(division2.pools[1].matches.length).toBe(10)
			//Assert 2
			expect(queueArray[0]).toStrictEqual({ player1: { firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 } as Player, player2: { firstName: 'Sies', lastName: 'De Witte', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 } as Player } as Match)
			expect(queueArray[2]).toStrictEqual({
				player1: { firstName: 'p9', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 } as Player, player2:
						{ firstName: 'p10', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 } as Player
			} as Match)
		})

		test('GenerateQueue should return 1 queue', () => {
			//Assign
			const players: Player[] = [
				{ firstName: 'Jan', lastName: 'Janssen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'John', lastName: 'Doe', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pim', lastName: 'Munne', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Joe', lastName: 'Johnsson', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Mo', lastName: 'Gallad', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Maarten', lastName: 'De Zwart', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Melvin', lastName: 'Giebels', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Pieter', lastName: 'Bakker', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Robin', lastName: 'Schellius', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Sies', lastName: 'De Witte', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'Davide', lastName: 'Ambesi', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p1', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p2', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p3', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p4', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p5', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p6', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p7', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p8', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p9', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p10', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
			]
			const pool1: Pool = {
				poolNr: 3, matches: [], players: [
					{ firstName: 'Jan', lastName: 'Janssen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'John', lastName: 'Doe', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Pim', lastName: 'Munne', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Joe', lastName: 'Johnsson', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Mo', lastName: 'Gallad', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Robin', lastName: 'Schellius', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },]
			}
			const pool2: Pool = {
				poolNr: 4, matches: [], players: [
					{ firstName: 'Maarten', lastName: 'De Zwart', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Melvin', lastName: 'Giebels', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Pieter', lastName: 'Bakker', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'Sies', lastName: 'De Witte', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },]
			}

			const division1: Division = { name: 'beginners', players: players, pools: [pool1, pool2] } as Division

			const pool3: Pool = {
				poolNr: 5, matches: [], players: [
					{ firstName: 'p1', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p2', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p3', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p4', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p5', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				]
			}
			const division2: Division = { name: 'gevordenen', players: players, pools: [pool3] } as Division
			//Act
			const newDivision1 = tournamentGenerator.generateMatchesInPool(division1)
			const newDivision2 = tournamentGenerator.generateMatchesInPool(division2)
			//Assign
			const tournament: Tournament = { name: 'fit, fun friends Tournament', divisions: [newDivision1, newDivision2], date: new Date('2022-01-16') }
			//Act
			const queue = tournamentGenerator.generateQueueForPool(tournament)
			const queueArray = queue.toArray()
			//Assert
			expect(division1.pools[0].matches.length).toBe(15)
			expect(division1.pools[1].matches.length).toBe(10)
			expect(division2.pools[0].matches.length).toBe(10)
			//Assert 2
			expect(queueArray[0]).toStrictEqual({ player1: { firstName: 'Stijn', lastName: 'van Houwelingen', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 } as Player, player2: { firstName: 'Sies', lastName: 'De Witte', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 } as Player } as Match)
			expect(queueArray[3]).toStrictEqual({
				player1: { firstName: 'p4', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 } as Player, player2:
						{ firstName: 'p5', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 } as Player
			} as Match)
		})
	})
	describe('calculateWinningPlayer', () => {
		test('calculateWinningPlayer should return return true if player one has more points than player 2 ', () => {
			//Assign
			const players: Player[] = [
				{ firstName: 'p1', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
				{ firstName: 'p2', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
			]
			const pool1: Pool = {
				poolNr: 1, matches: [], players: [
					{ firstName: 'p1', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },
					{ firstName: 'p2', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },]
			}

			const division1: Division = { name: 'beginners', players: players, pools: [pool1] } as Division
			//Act
			const newDivision1 = tournamentGenerator.generateMatchesInPool(division1)
			newDivision1.pools[0].matches[0].sets = []
			newDivision1.pools[0].matches[0].sets[0] = { playerOneScore: 11, playerTwoScore: 9 }
			newDivision1.pools[0].matches[0].sets[1] = { playerOneScore: 8, playerTwoScore: 11 }
			newDivision1.pools[0].matches[0].sets[1] = { playerOneScore: 13, playerTwoScore: 11 }
			const setResults = tournamentGenerator.calculateWinningPlayer(newDivision1.pools[0].matches[0].sets)
			//Assert
			expect(setResults).toBe(true)
		})
	})
	describe('calculateFinals', () => {
		test('calculateFinals should return a final when 2 half-finals are provided', () => {
			//Assign
			const p1 = { firstName: 'p1', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 }
			const p2 = { firstName: 'p2', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 }
			const p3= { firstName: 'p3', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 }
			const p4 = { firstName: 'p4', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 }
			
			const match1 : KnockoutMatch = {player1: p1,player2:p2,playerOneHasWon: true, layer: 1}
			const match2 : KnockoutMatch = {player1: p3,player2:p4,playerOneHasWon: false, layer: 1}
			const matchArray : KnockoutMatch[] = [match1,match2]
			//Act
			const sut = tournamentGenerator.calculateFinals(matchArray)
			//Assert
			expect(sut.length).toEqual(1)
			expect(sut[0]).toStrictEqual({player1: { firstName: 'p1', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 },player2:{ firstName: 'p4', lastName: '-', matchPoints: 0,setPoints: 0,totalScoredPoints: 0 }, layer: 0})
		})
	})
})