import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PlayerService } from '../../../services/player.service'
import { DivisionService } from '../../../services/division.service'
import { Division, Player } from '../../../../../../../libs/models'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { TournamentService } from '../../../services/tournament.service'


@Component({
	selector: 'bress-squash-toernooi-player-list',
	templateUrl: './player-list.component.html',
	styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
	players: Player[][]  = []
	playerDivision: Division | null = null
	playerCount = 0
	faUserSlash = faUserSlash
	selectList: Division[] = []
	selectedOption: string

	isEdit = false
	
	public player: Player = {
		firstName: '',
		lastName: '',
		matchPoints: 0,
		setPoints: 0,
		totalScoredPoints: 0
	}

	tournamentId: string | null = null

	constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private divisionService: DivisionService,
	private tournamentService: TournamentService
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(() => {
			this.route.parent?.paramMap.subscribe((params) => {
				this.tournamentId = params.get('id')
				if (this.tournamentId) {
					this.divisionService.getDivisionsByTournamentId(this.tournamentId).subscribe((selectList) => {
						this.selectList = selectList.reverse()
					})
					this.getPlayers()
				} 
			})
		})	
	}

	getPlayers(): void {
		// Clear players array
		this.players[0] = []
		this.players[1] = []
		this.players[2] = []
		
		// Get all players in the diffrent division
		this.playerService.getAll(this.tournamentId).subscribe((divisions)=> {
			divisions.forEach((division) => {
				if(division.players != null){
					if(division.name == 'Beginner'){
						this.players[0] = division.players
					} else if(division.name == 'Halfgevorderden'){
						this.players[1] = division.players
					}else if(division.name == 'Gevorderden'){
						this.players[2] = division.players
					}
				}
			})
		})

		// Get player count
		this.tournamentService.getPlayerCount(this.tournamentId).subscribe((playerCount) => {
			this.playerCount = playerCount
		})		
	}

	onSubmit() {
		this.playerService.createPlayer(this.selectedOption, this.player).subscribe(() => {
			this.getPlayers()
		})
	  }

	removePlayer(id: any) {
		this.playerService.deletePlayer(id).subscribe(() => {
			this.getPlayers()
		})
	  }

}

