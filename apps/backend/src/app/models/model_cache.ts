import mongoose = require('mongoose')

// Alle modellen die via deze functie geëxporteerd worden kunnen gebruikt worden in de tests
export default function getModel(modelName, modelSchema) {
	return mongoose.models[modelName] ? mongoose.model(modelName) : mongoose.model(modelName, modelSchema)
}
