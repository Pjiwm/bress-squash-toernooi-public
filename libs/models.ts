class Tournament {
	_id?: string
	name: string
	date: Date
	divisions: Division[]
	playerCount?: number
}

class Division {
	_id?: string
	name: string
	pools?: Pool[]
	players?: Player[]
	knockoutMatches?: KnockoutMatch[]

	public constructor(init?:Partial<Division>) {
        Object.assign(this, init);
    }
}

class Pool {
	_id?: string
	poolNr: number
	players: Player[]
	matches: PoolMatch[] = new Array
	playersPlacements?: Player[] //Order of placements within a pool, could be persisted
}

class Player {
	_id?: string
	firstName: string
	lastName: string
	//Calculated in calculateWinningPlayer
	matchPoints= 0
	//Calculated in calculateWinningPlayer
	setPoints= 0
	//Calculated in calculateWinningPlayer
	totalScoredPoints= 0
}
interface Match {
 _id?: string
  player1: Player
  player2: Player
  playerOneHasWon?: boolean //Should be persisted
  sets?: Set[]
  hallName?: string
}
class Set {
	_id?: string
	playerOneScore: number
	playerTwoScore: number
}

class PoolMatch implements Match {
	_id?: string
	player1: Player
	player2: Player
	sets?: Set[]
	//Calculated in calculateWinningPlayer
	playerOneHasWon?: boolean
	hallName?: string
}

class KnockoutMatch implements Match {
	_id?: string
	player1: Player
	player2: Player
	sets?: Set[]
	playerOneHasWon?: boolean
	hallName?: string
	layer: number
}

export {Tournament, Division, Pool, Player, KnockoutMatch, PoolMatch, Match,Set}