import { Injectable } from '@angular/core'
import { Match, Player } from './match.model'

@Injectable({
	providedIn: 'root'
})
export class MatchService {

	readonly playerOne: Player = 
		{
			_id: '61dd819139aadb0eee43834b',
			name: 'Melvin Giebels',
			email: 'melvin@student.avans.com'
		}

	readonly playerTwo: Player =
		{
			_id: '61dd819139aadb0eee43834b',
			name: 'Pieter Bakker',
			email: 'pieter@student.avans.com'
		}
   
	readonly matches: Match[] = [
		{
			_id: '61dd7e0faba46804bc886b64',
			playerOne: this.playerOne,
			playerTwo: this.playerTwo,
		},
		{
			_id: '61dd8386dd7ee8dfa2a1aec8',
			playerOne: this.playerTwo,
			playerTwo: this.playerOne,
		},
	]



	constructor() { }

	getMatches(): Match[] {
		return this.matches
	}

	getMatchById(id: string): Match {
		return this.matches.filter((t) => t._id === id)[0]
	}
}
