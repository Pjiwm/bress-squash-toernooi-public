import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
// import { Poule } from '../poule.model'
// import { PouleService } from '../poule.service'
import { PoolService } from '../../../services/pool.service'
import {Player, Pool} from '../../../../../../../libs/models'
@Component({
	selector: 'bress-squash-toernooi-poule-detail',
	templateUrl: './poule-detail.component.html',
	styleUrls: ['./poule-detail.component.scss'],
})
export class PouleDetailComponent implements OnInit {
	pool: Pool | undefined
	poolId: string | null = null

	constructor(
    private route: ActivatedRoute,
    private pouleService: PoolService
	) {}

	ngOnInit(): void {
		//TODO change request to get players
		this.route.paramMap.subscribe((params) => {
			this.poolId = params.get('pouleId')
			console.log(this.poolId)
			if (this.poolId != null) {
				 this.pouleService.getByIdWithPoolmatches(this.poolId).subscribe((pool) => {
					 console.log('pool: ',pool)
					pool.players = this.orderPlayersByScore(pool.players)
					this.pool = pool
				 })
			}
		})
	}
	private orderPlayersByScore(players: Player[]): Player[] {
		return players.sort((a, b) => {
			if (b.matchPoints - a.matchPoints != 0) {
				return b.matchPoints - a.matchPoints
			} else if (b.setPoints - a.setPoints != 0) {
				return b.setPoints - a.setPoints
			} else {
				//Assumes there is always a difference in totalScoredPoints
				return b.totalScoredPoints - a.totalScoredPoints
			}
		})
	}

}
