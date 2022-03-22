import { Component, OnInit } from '@angular/core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { Tournament } from '../../../../../../../libs/models'
import * as moment from 'moment'
import { TournamentService } from '../../../services/tournament.service'
@Component({
	selector: 'bress-squash-toernooi-tournament-list',
	templateUrl: './tournament-list.component.html',
	styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
	faPlusSquare = faPlusSquare
	tournaments: Tournament[] | undefined
	constructor(private tournamentService: TournamentService) { }

	async ngOnInit(): Promise<void> {

		this.tournamentService.getAll().subscribe((tournaments) => {
			this.tournaments = tournaments
			this.tournaments.forEach((tournament) =>{
				this.tournamentService.getPlayerCount(tournament._id).subscribe((playerCount) => {
					console.log(playerCount)
					tournament.playerCount = playerCount
				})
				console.log(tournament.date)
			})
		})
	}

	formatMonth(date: Date): string {
		return moment(date).locale('nl').format('MMM').split('.').join('')
	}

	formatDay(date: Date): string {
		return date.getDate().toString()
	}

	formatDate(date: Date): string {
		return moment(date).locale('nl').format('LL')
	}

	formatTime(date: Date): string {
		return moment(date).locale('nl').format('LT')
	}

}
