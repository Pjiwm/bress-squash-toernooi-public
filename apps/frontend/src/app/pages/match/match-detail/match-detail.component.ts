import { Component, OnInit } from '@angular/core'
import { Router,ActivatedRoute } from '@angular/router'
// import { Match} from '../match.model'
// import { MatchService } from '../match.service'
import { Match, Set } from '../../../../../../../libs/models'
import { PoolMatchService } from '../../../services/pool.match.service'
import { KoMatchService } from '../../../services/ko.match.service'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { NavigationService } from '../../../services/navigation.service'
import { PoolService } from '../../../services/pool.service'

@Component({
	selector: 'bress-squash-toernooi-match-detail',
	templateUrl: './match-detail.component.html',
	styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

	matchId: string | null = null
	poolId: string | null = null
	match: Match | undefined

	sets: Set [] = [
		{
			playerOneScore: 0,
			playerTwoScore: 0
		},
		{
			playerOneScore: 0,
			playerTwoScore: 0
		},		{
			playerOneScore: 0,
			playerTwoScore: 0
		},
	]

	faArrowLeft = faArrowLeft

	constructor(    
    private route: ActivatedRoute,
	private navigation: NavigationService,
    private poolMatchService: PoolMatchService,
	private koMatchService: KoMatchService,
	private poolService: PoolService,
	private router: Router
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.matchId = params.get('matchId')
			this.poolId = params.get('pouleId')
			console.log(this.matchId)
			console.log(this.poolId)
			if (this.poolId != null) {
				 this.poolService.getByIdWithPoolmatches(this.poolId).subscribe((pool) => {
					 console.log('pool: ', pool)
					 for (let index = 0; index <  pool.matches.length; index++) {
						 if(pool.matches[index]._id === this.matchId){
							this.match = pool.matches[index]
						 }
					 }
				 })
			}
		})
	}

	onSubmit(): void {
		console.log(this.sets)
		this.poolMatchService.createSets(this.sets, this.matchId).subscribe((result) => {
			console.log(result)
		})
		// this.router.navigateByUrl('/')
	}

	back(): void {
		this.navigation.back()
	  }

}
