export class Player {
	_id: string
	name: string
	email: string 
	matchPoints?= 0
	setPoints?= 0
	totalScoredPoints?= 0

	constructor(_id = '', name = '', email = '') {
		this._id = _id
		this.name = name
		this.email = email
	}
}

export class Match {
	_id: string
	playerOne: Player
	playerTwo: Player
	playerOneHasWon?: boolean
	sets?: Set[]
	hallName?: string

	constructor(_id = '', playerOne = new Player(), playerTwo = new Player()) {
		this._id = _id
		this.playerOne = playerOne
		this.playerTwo = playerTwo
	}
}

export class Set {
	_id: string
	playerOneScore: number
	playerTwoScore: number

	constructor(_id = '', playerOneScore = 0, playerTwoScore = 0) {
		this._id = _id
		this.playerOneScore = playerOneScore
		this.playerTwoScore = playerTwoScore
	}
}
