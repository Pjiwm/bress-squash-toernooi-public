import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Tournament } from './tournament.model'
import { TournamentService } from './test-tournament.service'

@Component({
	selector: 'bress-squash-toernooi-tournament-edit',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
	tournamentId: string | null = null
	tournament: Tournament | undefined
	boolean = false

	constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.tournamentId = params.get('id')
			if (this.tournamentId != null) {
				this.tournament = this.tournamentService.getTournamentById(this.tournamentId)
				this.boolean = true
			} else {
				this.boolean = false
			}
		})
	}

}
