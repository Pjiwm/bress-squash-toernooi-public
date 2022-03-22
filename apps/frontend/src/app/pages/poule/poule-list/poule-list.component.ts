import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router} from '@angular/router'
import { Tournament, Division } from '../../../../../../../libs/models'
import { TournamentService } from '../../../services/tournament.service'
import { PoolService } from '../../../services/pool.service'

@Component({
	selector: 'bress-squash-toernooi-poule-list',
	templateUrl: './poule-list.component.html',
	styleUrls: ['./poule-list.component.scss'],
})
export class PouleListComponent implements OnInit {
	tournament: Tournament | undefined
	tournamentId: string | null = null

	isStarted = false
	divisions: Division[]

	constructor(
    private route: ActivatedRoute,
	private router: Router,
    private tournamentService: TournamentService,
    private poolService: PoolService
	) {
		this.divisions = []
	}

	ngOnInit(): void {
		this.route.parent?.paramMap.subscribe((params) => {
			this.tournamentId = params.get('id')
			console.log('hoi' + this.tournamentId)
			if (this.tournamentId) { 
				this.getTournamentDivisions()
				console.log(this.divisions)
			}
		})
	}

	getTournamentDivisions(): void {
		this.tournamentService.getById(this.tournamentId).subscribe((tournament) => {
			console.log('tournaments: ',tournament)
			if(tournament.divisions !== undefined) {
				this.isStarted = true
				tournament.divisions.forEach((division) => {
					if(division.name === 'Beginner') {
						this.divisions[0] = division
						this.divisions[0].pools?.reverse()
						// console.log('PULL up' + this.divisions[0]?.pools)
						// this.router.navigate([this.divisions[0].pools?[0]])
					} else if (division.name === 'Halfgevorderden') {
						this.divisions[1] = division
						this.divisions[1].pools?.reverse()
					} else {
						this.divisions[2] = division
						this.divisions[2].pools?.reverse()
					}
				})
			}
		})
	}

	generatePools(): void {
		this.isStarted = true
		console.log('Generate pools')
		this.tournamentService.generatePools(this.tournamentId).subscribe(() => {
			this.getTournamentDivisions()
		})
		
	}
}
