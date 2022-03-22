import { NeoController } from './neo.controller'
import neo = require('../../../neo')
import { tournamentGenerator } from '../services/tournament.service'
import { Player } from '../../../../../libs/models'
// import { tournamentGenerator } from '../services/tournament.service'

export class NeoSet extends NeoController {
	constructor(private matchType: string){
		super('Set')
	}
	override create1deep = async (req, res, next) => {
		console.log(`create1deep aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)
		let result0
		let playerOne : Player = new Player()
		let playerTwo : Player = new Player()
		const session = neo.session()
		let query0
		if(this.matchType == 'PoolMatch') {
			query0 = 'MATCH (p1:Player)-[]->(pm:PoolMatch{_id: $id})-[]->(p2:Player) RETURN {poolMatch: pm._id, players: {player1: properties(p1), player2: properties(p2)}}'
		} else{
			query0 = 'MATCH (p1:Player)-[]->(pm:KnockoutMatch{_id: $id})-[]->(p2:Player) RETURN {knockoutMatch: pm._id, players: {player1: properties(p1), player2: properties(p2)}}'
		}
		const result1 = await session.run(query0,
			{
				id: req.params.id
			})
		playerOne = result1.records[0]._fields[0].players.player1 as Player
		playerTwo = result1.records[0]._fields[0].players.player2 as Player
		for(let i = 0; i < req.body.sets.length;i++){
			let properties = JSON.stringify(req.body.sets[i])
			properties = `${properties.replace(/"([^"]+)":/g, '$1:')}`
			let query1 = ''
			if(this.matchType == 'PoolMatch') {
				query1 = `MATCH (m:PoolMatch{_id: $id}) ${neo.addStart}${this.label}${properties}${neo.relationSetWITHMatch} RETURN properties(m)`
			} else{
				query1 = `MATCH (m:KnockoutMatch{_id: $id}) ${neo.addStart}${this.label}${properties}${neo.relationSetWITHMatch} RETURN properties(m)`
			}
			console.log('Query:', query1)
			result0 = await session.run(query1,
				{
					id: req.params.id,
					player1: req.body.sets[i].playerOneScore,
					player2: req.body.sets[i].playerTwoScore
				})
			playerOne.totalScoredPoints += req.body.sets[i].playerOneScore
			playerTwo.totalScoredPoints += req.body.sets[i].playerTwoScore
			req.body.sets[i].playerOneScore > req.body.sets[i].playerTwoScore ? playerOne.setPoints += 1 : playerTwo.setPoints += 1
		}
		const bool  = tournamentGenerator.calculateWinningPlayer(req.body.sets)
		bool ? playerOne.matchPoints +=1 : playerTwo.matchPoints +=1
		let query2
		if(this.matchType == 'PoolMatch') {
			query2 = 'MATCH (m:PoolMatch{_id: $id}) SET m.playerOneHasWon = $bool'
		} else{
			query2 = 'MATCH (m:KnockoutMatch{_id: $id}) SET m.playerOneHasWon = $bool'
		}

		const result2 = await session.run(query2,
			{
				id: req.params.id,
				bool: bool
			})
			
		const playerOnePointsResult = await session.run('MATCH (p:Player{_id: $id}) SET p.matchPoints = $matchPoints, p.setPoints = $setPoints, p.totalScoredPoints = $totalScoredPoints',
			{
				id: playerOne._id,
				matchPoints: neo.neo4j.int(playerOne.matchPoints),
				setPoints: neo.neo4j.int(playerOne.setPoints),
				totalScoredPoints: neo.neo4j.int(playerOne.totalScoredPoints)
			})
		const playerTwoPointsResult = await session.run('MATCH (p:Player{_id: $id}) SET p.matchPoints = $matchPoints, p.setPoints = $setPoints, p.totalScoredPoints = $totalScoredPoints',
			{
				id: playerTwo._id,
				matchPoints: neo.neo4j.int(playerTwo.matchPoints),
				setPoints:  neo.neo4j.int(playerTwo.setPoints),
				totalScoredPoints: neo.neo4j.int(playerTwo.totalScoredPoints)
			})
		session.close()
		console.log(result1,result2,playerOnePointsResult,playerTwoPointsResult)
		if (result0.records) {
			res.status(201).send({result: 'Successfully created.' }).end()
		} else {
			next()
		}
	}
}