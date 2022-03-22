const secret = process.env.JWT_SECRET
import jwt = require('jsonwebtoken')

export = function(user) {
	return jwt.sign(user.toJSON(), secret)
}