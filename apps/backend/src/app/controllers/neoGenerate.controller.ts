import { NeoController } from './neo.controller'
import { tournamentGenerator } from '../services/tournament.service'
import { NeoQueue } from './neoQueue.controller'
import { Player, Division,Tournament } from '../../../../../libs/models'
import neo = require('../../../neo')

export class NeoGenerate extends NeoController  {
	constructor(label: string) {
		super(label)
	}
	
	generatePools = async (req, res, next) => {
		if (req) {
			const session1 = neo.session()
			const resultTournament = await session1.run(neo.getTournament, {tournamentId: req.params.id})
			const resultDivisions = await session1.run(neo.getDivisionsInTournament, {tournamentId: req.params.id})
			session1.close() 
			if(resultTournament.records[0] == undefined) {
				next()
			}

			const divisions : Division[] = []

			const tournament = {_id: resultTournament.records[0]._fields[0]._id, name: resultTournament.records[0]._fields[0].name, date: resultTournament.records[0]._fields[0].date, divisions: divisions}
			for (let index = 0; index < resultDivisions.records.length; index++) {
				const div = resultDivisions.records[index]._fields[0]
				const session2 = neo.session()
				const players : Player[] = []
				const resultPlayers = await session2.run(neo.getPlayersInDivision, {divisionId: div._id})
				session2.close() 
				resultPlayers.records.forEach(p => {
					players.push(<Player>{_id: p._fields[0]._id, firstName: p._fields[0].firstName, lastName: p._fields[0].lastName})
				})
				divisions.push(<Division>{_id: div._id, name: div.name, players: players})
			}
			
	
			for(let i = 0; i < tournament.divisions.length; i++){
				if(tournament.divisions[i].players.length != 0){

					tournament.divisions[i].pools = tournamentGenerator.generatePools(tournament.divisions[i].players)
					tournament.divisions[i] = tournamentGenerator.generateMatchesInPool(tournament.divisions[i])
	
					for(let j = 0; j < tournament.divisions[i].pools.length; j++){
						const session3 = neo.session()
						const poolId = await session3.run(neo.createPool, {did: tournament.divisions[i]._id, poolNr: neo.neo4j.int(tournament.divisions[i].pools[j].poolNr)})
						for(let k = 0; k < tournament.divisions[i].pools[j].players.length; k++){
							const player = tournament.divisions[i].pools[j].players[k]
							await session3.run(neo.relationPlayerWITHPool, {pid: player._id, plid: poolId.records[0]._fields[0].poolId})
						}
	
						for(let l = 0; l < tournament.divisions[i].pools[j].matches.length; l++){
							const match = tournament.divisions[i].pools[j].matches[l]
							console.log('PLAYERS: ' + match.player1.firstName + ' | ' + match.player2.firstName)

							await session3.run(neo.relationPlayerWITHMatch, {p1id: match.player1._id, p2id: match.player2._id})
							const resultMatch = await session3.run(neo.getMatch, {p1id: match.player1._id, p2id: match.player2._id})

							console.log('PLAYERS ' + l + ': ' + match.player1._id + ' | ' + match.player2._id)
							console.log('aaaaaaaaaaaaaaaaaaaaResultmatch:', resultMatch.records[0]._fields)

							tournament.divisions[i].pools[j].matches[l]._id = resultMatch.records[0]._fields[0]._id
							if(tournament.divisions[i].pools[j].matches[l]._id == undefined){
								console.log('undefined match', resultMatch.records[0])
								console.log('undefined name1: ',match.player1.firstName)
								console.log('undefined name2: ',match.player2.firstName)
							}
						}
						session3.close() 
					}
					const queueController = new NeoQueue()
					const queue = await queueController.generateQueueForPool(tournament,tournament._id)
					console.log('Queue',queue)
				}
			}
				
			const session4 = neo.session()
			const test1 = await session4.run(neo.getDivisionsPoolsMatches, {
				tournamentId: resultTournament.records[0]._fields[0]._id
			})
			session4.close() 
			res.status(201).send({result: 'Successfully created.', data: test1.records[0]._fields[0]}).end()
				
			console.log('SESSION CLOSED')
		} else {
			next()
		}
	}
	/* istanbul ignore next */
	generateKo = async (req, res, next) => {
		console.warn('Untested method!')
		if (req) {
			const session1 = neo.session()
			const resultTournament = await session1.run(neo.getTournament, {tournamentId: req.params.id})
			const resultTotalTournament = await session1.run(neo.getDivisionsPoolsMatchesWITHPoolPlayers, {tournamentId: req.params.id})
			const tournament : Tournament = {_id: resultTournament.records[0]._fields[0]._id, name: resultTournament.records[0]._fields[0].name, date: resultTournament.records[0]._fields[0].date, divisions: []}
			console.log('TOURNAMENT OBJECT', resultTournament.records[0]._fields[0].date)
			
			console.log(resultTotalTournament.records[0])
			for(let i = 0; i < resultTotalTournament.records[0]._fields[0].divisions.length; i++){
				let division = resultTotalTournament.records[0]._fields[0].divisions[i]
				division = resultTotalTournament.records[0]._fields[0].divisions[i]
				tournament.divisions.push(division)
			}

			const modelTournament = tournament as Tournament
			modelTournament.divisions.forEach(division => {
				division = tournamentGenerator.calculateKnockoutMatches(division)
				console.log(division)
				const loopFunction = new Promise<string>((resolve, reject) => {
					
					division.knockoutMatches.forEach(async knockoutMatch => {
						const session2 = neo.session()
						await session2.run(`MATCH (p1:Player{_id: $player1Id}) MATCH (p2:Player{_id: $player2Id}) MERGE (p1)-[:PLAYS]->(km:KnockoutMatch{_id: apoc.create.uuid(), layer: ${knockoutMatch.layer}})-[:PLAYS]->(p2)`,
						 {
							 player1Id: knockoutMatch.player1._id,
							 player2Id: knockoutMatch.player2._id
							})
						session2.close()
						resolve('')
					})
				})
				loopFunction.finally(async () => {
					res.status(201).send({result: 'Successfully created.'}).end()
					console.log('SESSION CLOSED')
				})
			})
		} else {
			next()
		}
	}
	/* istanbul ignore next */
	generateFinals = async (req, res, next) => {
		console.warn('Untested method!')
		if (req) {
			const session1 = neo.session()
			const resultTournament = await session1.run(neo.getTournament, {tournamentId: req.params.id})
			const resultTotalTournament = await session1.run(neo.getDivisionsKnockoutMatches, {tournamentId: req.params.id})
			const tournament : Tournament = {_id: resultTournament.records[0]._fields[0]._id, name: resultTournament.records[0]._fields[0].name, date: resultTournament.records[0]._fields[0].date, divisions: []}
			console.log('TOURNAMENT OBJECT', resultTournament.records[0]._fields[0].date)
			
			console.log(resultTotalTournament.records[0])
			for(let i = 0; i < resultTotalTournament.records[0]._fields[0].divisions.length; i++){
				let division = resultTotalTournament.records[0]._fields[0].divisions[i]
				division = resultTotalTournament.records[0]._fields[0].divisions[i]
				tournament.divisions.push(division)
			}

			const modelTournament = tournament as Tournament
			modelTournament.divisions.forEach(division => {
				try {
					division.knockoutMatches = tournamentGenerator.calculateFinals(division.knockoutMatches)
				} catch (error) {
					res.status(400).send({error: error}).end()
					return
				}

				console.log('KNOCKOUTMATCHES',division.knockoutMatches)
				const loopFunction = new Promise<string>((resolve, reject) => {
					division.knockoutMatches.forEach(async knockoutMatch => {
						const session2 = neo.session()
						await session2.run(`MATCH (p1:Player{_id: $player1Id}) MATCH (p2:Player{_id: $player2Id}) MERGE (p1)-[:PLAYS]->(km:KnockoutMatch{_id: apoc.create.uuid(), layer: ${knockoutMatch.layer}})-[:PLAYS]->(p2)`,
						 {
							 player1Id: knockoutMatch.player1._id,
							 player2Id: knockoutMatch.player2._id
							})
						session2.close()
						resolve('')
					})
				})
				loopFunction.finally(async () => {
					res.status(201).send({result: 'Successfully created.'}).end()
					console.log('SESSION CLOSED')
				})
			})
		} else {
			next()
		}
	}
}