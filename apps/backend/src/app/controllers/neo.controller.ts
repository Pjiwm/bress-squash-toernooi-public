/* eslint-disable no-async-promise-executor */
import neo = require('../../../neo')
import { DatabaseInterface } from './database.interface'

export class NeoController implements DatabaseInterface {
	public label: string

	constructor(label: string) {
		this.label = label
	}

	getAll = async (req, res, next) =>  {
		console.log(`getAll aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)

		const session = neo.session()
		const result = await session.run(neo.getAll, {
			label: this.label,
		})
		session.close()
		console.log(result)
		const response = []

		if (result.records) {
			result.records.forEach(entity => {
				response.push(entity._fields[0])
			})

			res.status(200).send({result: response }).end()
		} else {
			next()
		}
	}

	getById = async (req, res, next) => {
		console.log(`getById aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)
		
		const session = neo.session()
		const result = await session.run(neo.getOne, {
			id: req.params.id,
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
		session.close()

		if (result.records) {
			res.status(201).send({result: 'Successfully created.', _id: result.records[0]._fields[0] }).end()
		} else {
			next()
		}
	}

	getAll1deep = async (req, res, next) => {
		console.log(`getAll1deep aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)

		let query = ''
		if(this.label === 'PoolMatch') {
			query = neo.getAllPoolMatch
		} else if(this.label === 'Tournament' && req.originalUrl.includes('division')){
			this.label = 'Division'
			query = neo.getAllDivision
		} else if(this.label === 'Set' && req.baseUrl.includes('poolmatch')){
			query = neo.getAllSetsPoolMatch
		} else if(this.label === 'Set' && req.baseUrl.includes('komatch')){
			query = neo.getAllSetsKoMatch
		} else {
			query = neo.getAll1deep
		}
    
		console.log('Query:', query)

		const session = neo.session()
		const result = await session.run(query, {
			id: req.params.id,
			label: this.label
		})
		session.close()

		if(req.originalUrl.includes('tournament') && req.originalUrl.includes('division')) {
			this.label = 'Tournament'
		}

		const response = []

		if (result.records) {
			result.records.forEach(entity => {
				response.push(entity._fields[0])
			})

			res.status(200).send({result: response }).end()
		} else {
			next()
		}
	}

	create1deep = async (req, res, next) =>{
		console.log(`create1deep aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)
		let properties = JSON.stringify(req.body)
		properties = `${properties.replace(/"([^"]+)":/g, '$1:')}`
		properties = `${properties.charAt(0)}${getUUIDString(properties)}${properties.substring(1)}`

		let query = ''
		if(this.label === 'Player') {
			query = `${neo.matchDivision}${neo.addStart}${this.label}${properties}${neo.relationPlayerWITHDivision}`
		} else if(this.label === 'Pool') {
			query = `${neo.matchDivision}${neo.addStart}${this.label}${properties}${neo.relationPoolWITHDivision}`
		} else if(this.label === 'KoMatch') {
			query = `${neo.matchDivision}${neo.addStart}${this.label}${properties}${neo.relationKoMatchWITHDivision}${neo.relationPlayersWITHMatch}`
		} else if(this.label === 'PoolMatch') {
			query = `${neo.matchPool}${neo.addStart}${this.label}${properties}${neo.relationPoolMatchWITHPool}${neo.relationPlayersWITHMatch}`
		}
        
		console.log('Query:', query)

		const session = neo.session()
		const result = await session.run(query,
			{
				id: req.params.id,
				player1: req.body.player1,
				player2: req.body.player2
			})
		session.close()

		if (result.records) {
			res.status(201).send({result: 'Successfully created.' }).end()
		} else {
			next()
		}
	}

	delete = async (req, res, next) =>  {
		console.log(`delete aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)

		const session = neo.session()
		const result = await session.run(neo.deleteById,
			{
				id: req.params.id,
			})
		session.close()

		if (result.records) {
			res.status(201).send({result: 'Successfully deleted.' }).end()
		} else {
			next()
		}
	}
}

export function getUUIDString(properties):string {
	console.log('PROPERTIES', properties)
	if(properties === '{}') {
		return '_id: apoc.create.uuid()'
	}

	return '_id: apoc.create.uuid(), '
}