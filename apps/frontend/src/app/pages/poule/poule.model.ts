export enum Divisions {
    beginner = 'beginner',
    intermediate = 'intermediate',
    expert = 'expert'
  }

export class Poule {
	_id: string
	name: string
	players: string[]
	division: string

	constructor(_id = '', name = '', players = [], division = Divisions.beginner) {
		this._id = _id
		this.name = name
		this.players = players
		this.division = division
	}
}
