/* eslint-disable no-async-promise-executor */
import neo = require('../../../neo')

export class MatchController {

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
	getAll1deep = async (req, res, next) => {
		console.log(`getAll1deep aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)
		const session = neo.session()
		const result = await session.run(neo.getAllSetsMatch, {
			id: req.params.id,
		})
		session.close()

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
	getAll = async (req, res, next) =>  {
		console.log(`getAll aangeroepen\nREQ baseUrl: ${req.baseUrl}\nREQ originalUrl: ${req.originalUrl}`)

		const session = neo.session()
		const result = await session.run(neo.getAllMatch, {
			id: req.params.id
		})
		session.close()
		console.log(result)

		if (result.records) {
			const response = result.records[0]._fields[0]

			res.status(200).send({result: response }).end()
		} else {
			next()
		}
	}
}