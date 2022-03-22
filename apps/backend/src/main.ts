import * as express from 'express'
const app = express()
import * as dotenv from 'dotenv'
dotenv.config()

import router from './app/router/router'
import BodyParser = require('body-parser')
import errors = require('./app/helpers/errors')
import databases = require('./database.connection')
import cors = require('cors')
import { auth } from 'express-oauth2-jwt-bearer'
const checkJwt = auth({
	audience: 'https://bress-squash-toernooi.eu.auth0.com/api/v2/',
	issuerBaseURL: 'https://bress-squash-toernooi.eu.auth0.com/',
})

async function connectToDatabases(){
	databases.connectToMongo()
	databases.connectToNeo()
}

connectToDatabases()
app.use(cors())
app.use(BodyParser.json())


// Routes
app.get('/', (req, res) => {
	res.send({ status: 'online' })
})

// If it's a testing environment we don't need authentication
if (process.env.NODE_ENV !== 'test') {
	app.use('/api', checkJwt, router)

} else {
	app.use('/api', router)
}

app.use('*', function (_, res) {
	res.status(404).end()
})

// error responses
app.use('*', function (err, req, res, next) {
	console.error(`${err.name}: ${err.message}`)
	next(err)
})

app.use('*', errors.handlers)

app.use('*', function (err, req, res, next) {
	if(err.code === 'invalid_token'){
		res.status(401).json({
			error: 'Token invalid'
		})
	} else {
		res.status(500).json({
			error: 'Something unexpected happened. Please contact developers.'
		})
	}

})

app.use(async (err, req, res, next) => {
	res.status(422).send({ error: err.message })
})

export { app }

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
	if (port === 3000) {
		console.log(`Listening at http://localhost:${port}/api`)
	} else {
		console.log('Listening at https://bress-squash-toernooi.herokuapp.com/api')
	}
})
server.on('error', console.error)
