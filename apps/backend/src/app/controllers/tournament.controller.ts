import { NeoController, getUUIDString } from './neo.controller'
import neo = require('../../../neo')
import { Division } from '../../../../../libs/models'
export class NeoTournament extends NeoController{
	getPlayerCount = async (req, res, next) => {
		console.log(`getPlayerCount aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)
		
		const session = neo.session()
		const result = await session.run(neo.getPlayerCount, {
			tournamentId: req.params.id,
		})
		session.close()

		if (result.records) {
			res.status(200).send({result: result.records[0]._fields[0] }).end()
		} else {
			next()
		}
	}
	override getById = async (req, res, next) => {
		console.log(`getPlayerCount aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)
		
		const session = neo.session()
		let result = await session.run(neo.getDivisionsPoolsMatchesWITHPoolPlayers, {
			tournamentId: req.params.id,
		})
		
		if(result.records[0] == undefined) {
			result = await session.run(neo.getOne, {
				id: req.params.id,
			})
		}

		session.close()

		if (result.records) {
			res.status(200).send({result: result.records[0]._fields[0] }).end()
		} else {
			next()
		}
	}
	getPlayers = async (req, res, next) => {
		console.log(`getPlayerCount aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)
		
		const session = neo.session()
		const result = await session.run(neo.getPlayersWITHDivisionWITHPlayers, {
			tournamentId: req.params.id,
		})
		session.close()

		if (result.records) {
			res.status(200).send({result: result.records[0]._fields[0] }).end()
		} else {
			next()
		}
	}

	create = async (req, res, next) => {
		console.log(`create aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)
		let properties = JSON.stringify(req.body)
		properties = `${properties.replace(/"([^"]+)":/g, '$1:')}`
		properties = `${properties.charAt(0)}${getUUIDString(properties)}${properties.substring(1)}`

		console.log('Query:', `${neo.addStart}${this.label}${properties})${neo.returnId}
		)`)

		const session = neo.session()
		const result = await session.run(`${neo.addStart}${this.label}${properties})${neo.returnId}`)

		const tournamentId = result.records[0]._fields[0]
		
		const divisions = [
			new Division({name: 'Beginner'}),
			new Division({name: 'Halfgevorderden'}),
			new Division({name: 'Gevorderden'})
		]

		for (let i = 0; i < divisions.length; i++) {
			const name = divisions[i].name
			await session.run(`${neo.matchTournament} ${neo.addStart}Division{_id: apoc.create.uuid(), name: "${name}"}) MERGE (e)-[:IS_PART_OF]->(t)`, {
				id: tournamentId
			})
		}
		
		session.close()

		if (result.records) {
			res.status(201).send({result: 'Successfully created.', _id: result.records[0]._fields[0] }).end()
		} else {
			next()
		}
	}

	update = async (req, res, next) => {
		console.log(`update aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)

		console.log('req.body', req.body.name)
		let query = `${neo.matchTournament}`

		if(req.body.name){
			query += ` SET t.name = "${req.body.name}"`
		}

		if(req.body.date){
			query += ` SET t.date = "${req.body.date}"`
		}

		console.log('Query:', query)
		console.log(req.params.id)

		const session = neo.session()
		const result = await session.run(query, {
			id: req.params.id
		})

		session.close()

		if (result.records) {
			res.status(201).send({result: 'Successfully updated.'}).end()
		} else {
			next()
		}
	}
}