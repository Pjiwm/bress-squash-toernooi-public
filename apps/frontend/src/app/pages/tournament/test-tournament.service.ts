import { Injectable } from '@angular/core'
import { Tournament } from './tournament.model'

@Injectable({
	providedIn: 'root',
})
export class TournamentService {
	readonly tournaments: Tournament[] = [
		{
			_id: '61acdcf5144d6ab0ecdfdad4',
			name: 'Winter toernooi',
			rooms: 6,
			startDate: new Date(),
			startTime: '18:30',
		},
		{
			_id: '61acdd28ef8287d57c12483a',
			name: 'Lente toernooi',
			rooms: 6,
			startDate: new Date(2021, 12, 23, 18, 0),
			startTime: '18:00',
		},
		{
			_id: '61acde499e4dcaf3a60afb97',
			name: 'Zomer toernooi',
			rooms: 6,
			startDate: new Date(2022, 1, 27, 18, 0),
			startTime: '18:30',
		},
		{
			_id: '61acc8ed766359ddf7895d9a',
			name: 'Herfst toernooi',
			rooms: 6,
			startDate: new Date(2021, 7, 19, 18, 0),
			startTime: '18:30',
		},
	]

	constructor() {}

	getTournaments(): Tournament[] {
		return this.tournaments
	}

	getTournamentById(id: string): Tournament {
		return this.tournaments.filter((t) => t._id === id)[0]
	}
}
