import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Tournament } from '../../../../../../../libs/models'
import { TournamentService } from '../../../services/tournament.service'

@Component({
	selector: 'bress-squash-toernooi-tournament-edit',
	templateUrl: './tournament-edit.component.html',
	styleUrls: ['./tournament-edit.component.scss']
})
export class TournamentEditComponent implements OnInit {
	tournament: Tournament
	tournamentId: string | null = null
	isEdit = false

	constructor(
    private route: ActivatedRoute,
	private router: Router,
    private tournamentService: TournamentService
	) { }

	ngOnInit(): void {

		this.route.parent?.paramMap.subscribe((params) => {
			this.tournamentId = params.get('id')
			console.log('tournament ID in edit: ' + this.tournamentId)
		})
		if (this.tournamentId) {
			this.tournamentService.getById(this.tournamentId).subscribe((tournament) =>{
				this.tournament = tournament
				console.log(this.tournament)
			})
			this.isEdit = true
		} else {
			this.tournament = new Tournament()
			this.isEdit = false
		}
	
	}

	onSubmit(): void {
		if(!this.isEdit) {
			this.tournamentService.create(this.tournament).subscribe((item) => this.tournament = item)
			this.router.navigate(['/'])
		} else {
			this.tournamentService.update(this.tournament, this.tournamentId).subscribe()
		}
	}
}
