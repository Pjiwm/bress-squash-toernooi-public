import { Injectable } from '@angular/core'
import { Poule, Divisions } from './poule.model'

@Injectable({
	providedIn: 'root',
})
export class PouleService {
	readonly poules: Poule[] = [
		{
			_id: '1',
			name: 'Poule 1',
			players: [
				'Alp van Ballegooij',
				'Hanad Heijboer',
				'Johannes Bothof',
				'Imogen Kampers',
			],
			division: Divisions.beginner,
		},
		{
			_id: '2',
			name: 'Poule 2',
			players: [
				'Niels Middendorp',
				'Pauliene Rispens',
				'Leidy Booi',
				'Janis Wijmenga',
				'Ishara Oudhuis'
			],
			division: Divisions.beginner,
		},
		{
			_id: '3',
			name: 'Poule 3',
			players: [
				'Alp van Ballegooij',
				'Hanad Heijboer',
				'Johannes Bothof',
				'Imogen Kampers',
			],
			division: Divisions.beginner,
		},
		{
			_id: '4',
			name: 'Poule 4',
			players: [
				'Anne-Maria Twaalfhoven',
				'Christiano Mostert',
				'Davine Lips',
				'Bodil Bossenbroek',
			],
			division: Divisions.beginner,
		},
		{
			_id: '6',
			name: 'Poule 1',
			players: [
				'Sten Boone',
				'Imogen Alberts',
				'Christos van der Sluijs',
				'Lucca van Utrecht',
				'Esmay Vriens'
			],
			division: Divisions.intermediate,
		},
		{
			_id: '7',
			name: 'Poule 2',
			players: [
				'Shadi van den Beukel',
				'Bregtje Korbee',
				'Maia Dirks',
				'Iskander Lai',
				'Nola Entius'
			],
			division: Divisions.intermediate,
		},
		{
			_id: '8',
			name: 'Poule 1',
			players: [
				'Gabriel Lans',
				'Azize Bakels',
				'Irfaan Bernards',
				'Simeon van Leuveren',
			],
			division: Divisions.expert,
		},
		{
			_id: '9',
			name: 'Poule 2',
			players: [
				'Soufyan Atema',
				'Tido Bassa',
				'Esad Cairo',
				'Laïla Bosch',
			],
			division: Divisions.expert,
		},
	]
	constructor() {}

	getBeginnerPoules(): Poule[] {
		return this.poules.filter((p) => p.division === 'beginner')
	}

	getIntermediatePoules(): Poule[] {
		return this.poules.filter((p) => p.division === 'intermediate')
	}

	getExpertPoules(): Poule[] {
		return this.poules.filter((p) => p.division === 'expert')
	}

	getPouleById(id: string ): Poule {
		return this.poules.filter((p) => p._id === id)[0]
	}
}
