import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { faCog, faUsers, faTrophy, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { Tournament } from '../../pages/tournament/tournament.model'
import { TournamentService } from '../../pages/tournament/test-tournament.service'

@Component({
	selector: 'bress-squash-toernooi-bottomnav',
	templateUrl: './bottomnav.component.html',
	styleUrls: ['./bottomnav.component.scss']
})
export class BottomnavComponent implements OnInit {
	faCog = faCog
	faUsers = faUsers
	faTrophy = faTrophy
	faCalenderAlt = faCalendarAlt

	tournamentId: string | null = null
	tournament: Tournament | null = null
	boolean = false

	constructor(
		public _router: Router,
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


