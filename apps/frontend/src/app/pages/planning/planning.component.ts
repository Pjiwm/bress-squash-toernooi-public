import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Match } from '../../../../../../libs/models'
import { TournamentService } from '../../services/tournament.service'
// import { TournamentService } from ''


@Component({
	selector: 'bress-squash-toernooi-planning',
	templateUrl: './planning.component.html',
	styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
	tournamentId: string | null = null
	matches : Match[] | undefined
	constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
	) {}

	ngOnInit(): void {
		this.route.parent?.paramMap.subscribe((params) => {
			this.tournamentId = params.get('id')
			console.log('tournament ID in planning: ' + this.tournamentId)
      
			this.tournamentId = params.get('id')
			if (this.tournamentId != null) {
				this.tournamentId
				this.tournamentService.getMatches(this.tournamentId).subscribe((matches) => {
					console.log('matches: ',matches)
					this.matches = matches
					this.matches = this.matches.filter((item) => {
						return item.playerOneHasWon == null
					})
					this.matches[0].player1.firstName
				})
			}
		})
	}

}
