import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { faCog, faUsers, faTrophy, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { Tournament } from '../../pages/tournament/tournament.model'
import { TournamentService } from '../../pages/tournament/test-tournament.service'

@Component({
	selector: 'bress-squash-toernooi-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
	faCog = faCog
	faUsers = faUsers
	faTrophy = faTrophy
	faCalenderAlt = faCalendarAlt

	tournamentId: string | null = null
	tournament: Tournament | null = null
	tournaments: Tournament[] = []
	boolean = false


	constructor(
		public router: Router,
		private route: ActivatedRoute,
		private tournamentService: TournamentService
	) { }

	ngOnInit(): void {

		this.route.paramMap.subscribe((params) => {
			this.tournamentId = params.get('id')
			if (this.tournamentId) {
				this.tournament = this.tournamentService.getTournamentById(this.tournamentId)
				this.boolean = true
				console.log('tournament ID Sidenav: ' + this.tournamentId)
			} else {
				this.boolean = false
				console.log('tournament ID Sidenav: ' + this.tournamentId)
			}
		})
	}
}