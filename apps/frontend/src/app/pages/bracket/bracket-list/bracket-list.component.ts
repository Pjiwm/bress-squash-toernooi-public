import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PouleService } from '../../poule/poule.service'
import { TournamentService } from '../../tournament/test-tournament.service'
import { Tournament } from '../../tournament/tournament.model'

@Component({
	selector: 'bress-squash-toernooi-bracket-list',
	templateUrl: './bracket-list.component.html',
	styleUrls: ['./bracket-list.component.scss']
})
export class BracketListComponent implements OnInit {
	tournament: Tournament | undefined
	tournamentId: string | null = null

	constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private pouleService: PouleService
	) { }

	ngOnInit(): void {
		// this.route.paramMap.subscribe((params) => {
		// 	this.tournamentId = params.get('id')
		// 	if (this.tournamentId != null) {
		// 		this.tournament = this.tournamentService.getTournamentById(
		// 			this.tournamentId
		// 		)
		// 	}
		// })

	}

}
