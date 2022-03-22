import mongoose = require('mongoose')
import neo_driver = require('../neo');

mongoose.Promise = global.Promise
async function connectToMongo(): Promise<void> {
	const mongoUrl = process.env.MONGO_DATABASE_CONNECTION || 'mongodb://localhost:27017'
	try {
		if (process.env.NODE_ENV !== 'test') {
			await mongoose.connect(`${mongoUrl}/squash`,{ keepAlive: true, keepAliveInitialDelay: 300000})
			console.info('Connected to Mongo DB')
		} else {
			await mongoose.connect(`${mongoUrl}/squash_test`)
			console.info('Connected to Mongo test DB')
		}
	} catch (err) {
		console.warn('Failed to connect to Mongo database, retrying in 6 seconds')
		console.error('Error: ',err)
		setTimeout(connectToMongo,6000)
	}
}

async function connectToNeo(): Promise<void> {
	try {
		if (process.env.NODE_ENV !== 'test') {
			await neo_driver.connect('neo4j')
			console.info('Connected to Neo4j DB')
		} else {
			await neo_driver.connect('neo4j')
			console.info('Connected to Neo4j test DB')
		}
	} catch (err) {
		console.warn('Failed to connect to Neo4j database, will try again in 6 seconds')
		console.error('Error: ',err)
		setTimeout(connectToNeo,6000)
	}
}


export {
	connectToMongo,
	connectToNeo
}
