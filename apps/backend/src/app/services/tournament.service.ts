import { Queue } from 'queue-typescript'
import { Player, Tournament, Division, Pool,KnockoutMatch,PoolMatch,Match,Set} from '../../../../../libs/models'
class TournamentGenerator {
	/**
   * Generates pools when given players the most evenly possible
   *
   * @param {Player} players - Input the players that you want to make pools with
   * @return {Pool} Returns the balanced pools
   * 
   * @example Example inputs:
   *  
   * 8 players returns 2 pools of 4
   * 
   * 7 players returns 1 pool of 7
   * 
   * 11 players returns 1 pool of 5 and 1 pool of 6
   */
	generatePools(players: Player[]): Pool[] {
		const outputPools: Pool[] = []
		const amountOfPlayers = players.length
		let amountOfPools = 0
		//Shuffles players, to stop players that are next to eachother in the list (e.g same first letter in first name) to always be in the same match
		players = this.shuffle(players)
		for (let i = 3; i < amountOfPlayers; i += 4) {
			amountOfPools++
			//Maximum amount of pools = 4
			if (amountOfPools === 4) {
				break
			}
		}
		//If there is 1 pool, all players are put in that pool
		if (amountOfPools != 1) {
			const minNumberOfPlayers = 4
			//We start with pools of 4
			for (let i = 0, j = 0; i < amountOfPools; i++, j += minNumberOfPlayers) {
				outputPools[i] = new Pool
				outputPools[i].players = players.slice(j, j + minNumberOfPlayers)
				outputPools[i].poolNr = i+1
			}
			//Remaining players will be sorted in the most even way possible
			const remainingPlayers: Player[] = players.slice(players.length - amountOfPlayers % 4, players.length)
			let n = amountOfPools - 1
			for (let remainder = amountOfPlayers % minNumberOfPlayers; 0 < remainder; remainder--) {
				//Adds 1 to value in array[n] and moves down to array[n-1]. If n = 0, it resets to the last pool (outputPools.length -1 = amountOfPools -1)
				outputPools[n].players.push(remainingPlayers[remainder - 1])
				n == 0 ? n = amountOfPools - 1 : n--
			}
		} else {
			outputPools[0] = new Pool
			outputPools[0].players = players
			outputPools[0].poolNr = 1
		}
		return outputPools
	}
	/**
   * Shuffles array
   *
   * @param {any} array - Input array
   * @return {any} Returns array with different order
   * 
   */
	shuffle(array: any): any {
		let currentIndex = array.length,
			randomIndex

		// While there remain elements to shuffle...
		while (currentIndex != 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
		}
		return array
	}
	/**
   * Generates matches in all pools in given division
   *
   * @param {Division} division - Input division with pools you want to generate matches for
   * @return {Division} - Returns division with pools including matches on matches property
   * 
   */
	public generateMatchesInPool(division: Division): Division {
		//Loops through divisions
		for (let i = 0; i < division.pools.length; i++) {
			const pool = division.pools[i]
			//Loops through players in pools of division i
			for (let j = 0; j < pool.players.length - 1; j++) {
				//For player j, loops through other players
				for (let k = j + 1; k < pool.players.length; k++) {
					pool.matches.push({ player1: pool.players[j], player2: pool.players[k] })
				}
			}
			division.pools[i] = pool
		}
		return division
	}
	/* istanbul ignore next */
	public generateQueueForPool(tournament: Tournament): Queue<Match> {
		console.warn('Untested method!')
		let totalMatchCount = 0
		const matches: PoolMatch[][] = []
		//Loops through tournaments
		for (let i = 0; i < tournament.divisions.length; i++) {
			const division : Division = tournament.divisions[i]
			matches[i] = []
			//Loops through pools of division i, add all matches of pool j to matches array
			if(division.pools != undefined) {
				for (let j = 0; j < division.pools.length; j++) {
					totalMatchCount += division.pools[j].matches.length
					matches[i] = matches[i].concat(division.pools[j].matches)
				}
			}
			
		}
		//Sorts matches for the first time
		matches.sort((a, b) => b.length - a.length)

		//If there is one division, all matches are added to the queue directly
		if (matches.length != 1) {
			const outputQueue: Queue<Match> = new Queue
			//n is i + 1, unless i is the last index, then n = 0
			let n = 1
			let i = 0
			let amountOfMatchesEnqueued = 0
			while (amountOfMatchesEnqueued < totalMatchCount) {
				let amountOfEnqueues = 0
				// Enqueues amountOfEnqueues matches from division i, where amountOfEnqueues is the amount of matches in division i divided by the amount of matches in division n
				if (matches[i].length === 0) {
					amountOfEnqueues = 0
				} else if (matches[n].length === 0) {
					amountOfEnqueues = 1
				} else {
					amountOfEnqueues = Math.ceil(matches[i].length / matches[n].length)
				}
				for (let j = 0; j < amountOfEnqueues; j++) {
					outputQueue.enqueue(matches[i].pop())
					amountOfMatchesEnqueued++
				}
				i == matches.length - 1 ? i = 0 : i++
				n == matches.length - 1 ? n = 0 : n++
			}
			return outputQueue
		} else {
			return new Queue<Match>(...matches[0])
		}
	}
	/**
   * Generates knockoutmatches when given a division with finished poolMatches.
   * For every knockoutMatch, the layer is also provided. The layer is top down, so 0 are the finals, 1 half-finals etc.
   * 
   * @param {Division} division - Input the division you want to generate knockoutmatches for
   * @return {Division} Returns division with knockoutmatches on property knockoutMatches
   * 
   * @example Example inputs:
   *  
   * Division with 2 pools, returns 2 knockoutmatches.
   * 
   */
	/* istanbul ignore next */
	public calculateKnockoutMatches(division: Division, shufflePlayers = true): Division {
		console.warn('Untested method!')
		let players: Player[] = []
		//Returns amount of layers - 1 thus the maximum index
		let layer = 0
		for (let i = 0; i < division.pools.length; i++) {
			division.pools[i].playersPlacements = this.orderPlayersByScore(division.pools[i].players)
			players.push(division.pools[i].playersPlacements[0])
			players.push(division.pools[i].playersPlacements[1])
		}
		if (division.pools.length == 3) {
			layer = (Math.log(division.pools.length + 1) / Math.log(2))
			players = players.concat(this.calculateBestTwoThirdPlayers(division.pools))
		} else {
			//Since the matches above the poolmatches are a treestructure, the amount of layers is log(2)
			layer = Math.log(division.pools.length) / Math.log(2)
		}
		//For testing purposes, shufflePlayers can be set to false, default is true
		if (shufflePlayers) players = this.shuffle(players)
		if(division.knockoutMatches == null){
			division.knockoutMatches = []
		}
		for (let i = 0; i < players.length; i += 2) {
			const knockoutMatch: KnockoutMatch = { player1: players[i], player2: players[i + 1], layer: layer }
			division.knockoutMatches.push(knockoutMatch)
		}
		return division
	}

	/**
 * Adds the next layer of finals to a queue. Uses calculateFinals and enqueues the resulting array.
 *
 * @param {KnockoutMatch[]} matches - Input matches where the winning players have been calculated and the next matches will be returned
 * @param {Queue<KnockoutMatch>} queue - Input the queue to be enqueued with the next knockoutMatches.
 * @return {Queue<KnockoutMatch>} Returns a queue where the knockmatches for the next layer (previous layer -1) have been added
 * 
 */
	/* istanbul ignore next */
	public enqueueFinals(matches : KnockoutMatch[],queue : Queue<KnockoutMatch>) : Queue<KnockoutMatch>{
		console.warn('Untested method!')
		const calculatedFinals = this.calculateFinals(matches)
		for(let i = 0; i < calculatedFinals.length; i++){
			queue.enqueue(calculatedFinals[i])
		}
		return queue
	}

	//Does not check if the division is finished
	//Does not put match of the highest division last
	/* istanbul ignore next */
	public enqueueKnockoutMatchesFromDivision(division: Division,queue : Queue<Match>) : Queue<Match>{
		console.warn('Untested method!')
		const calculatedKnockoutMatches = this.calculateKnockoutMatches(division)
		for(let i = 0; i < calculatedKnockoutMatches.knockoutMatches.length; i++){
			queue.enqueue(calculatedKnockoutMatches.knockoutMatches[i])
		}
		return queue
	}
	
	/**
 * Calculates knockoutmatches for the layers above the first layer of matches after the pools.
 *
 * @param {KnockoutMatch[]} matches - Input matches where the winning player have been calculated and the next matches will be returned
 * @return {KnockoutMatch[]} Returns the knockoutmatches for the next layer (previous layer -1)
 * 
 * @example Example inputs:
 *  
 * Matches with player 1 having 2 matchPoints, player 2 having 0 matchPoints sets playerOneHasWon to true and adds the these players to the next knockoutmatch.
 */
	/* istanbul ignore next */
	public calculateFinals(matches : KnockoutMatch[]) : KnockoutMatch[]{
		//Lowest layer first
		console.warn('Untested method!')
		if(matches[matches.length-1].layer !== 0){
			const returnItem: KnockoutMatch[] = []

			matches.sort((a,b) => a.layer-b.layer)

			const winningPlayers : Player[] = []
			const layer = matches[matches.length-1].layer -1

			for(let i = 0; i < matches.length; i++){
				if(matches[i].playerOneHasWon){
					winningPlayers.push(matches[i].player1)
				} else {
					winningPlayers.push(matches[i].player2)
				}
			}

			for(let i = 0; i < winningPlayers.length; i+=2){
				returnItem.push({player1:winningPlayers[i],player2: winningPlayers[i+1],layer: layer})
			}

			return returnItem
		} else {
			throw Error('Cannot make knockoutmatches for any layers lower than 0: there are no matches after the finals!')
		}
	}
	
	/**
 * Calculates the best 2 third players of pools of 3.
 *
 * @param {Pool[]} pools - Input pools
 * @return {Player[]} Returns the 2 best third players
 * 
 */
	/* istanbul ignore next */
	public calculateBestTwoThirdPlayers(pools: Pool[]): Player[] {
		console.warn('Untested method!')
		let players: Player[] = []
		const returnItem: Player[] = []
		for (let i = 0; i < pools.length; i++) {
			pools[i].playersPlacements = this.orderPlayersByScore(pools[i].players)
			players.push(pools[i].playersPlacements[2])
		}
		players = this.orderPlayersByScore(players)
		returnItem.push(players[0])
		returnItem.push(players[1])
		return returnItem
	}

	/**
 * Calculates which player has won for a match, and adds a setpoint to that player
 *
 * @param {Match} match - Input a match where the winning player has to be calculated
 * @return {Pool} Returns the balanced pools
 * 
 * @example Example inputs:
 *  
 * Match with player 1 having 10 points, player 2 having 9 points sets playerOneHasWon to true and adds 1 setpoint to player 1
 */
	public calculateWinningPlayer(sets: Set[]): boolean {
		let playerOneWonSets = 0, playerTwoWonSets = 0
		let bool  = false
		for (let j = 0; j < sets.length; j++) {
			const currentSet = sets[j]
			currentSet.playerOneScore > currentSet.playerTwoScore ? playerOneWonSets += 1 : playerTwoWonSets += 1
			// match.player1.totalScoredPoints += match.sets[j].playerOneScore
			// match.player2.totalScoredPoints += match.sets[j].playerTwoScore
			if (playerOneWonSets >= 2) {
				bool =  true
				// match.player1.matchPoints += 1

			} else if (playerTwoWonSets >= 2) {
				bool =  false
				// match.player2.matchPoints += 1
			}
		}
		// match.player1.setPoints = playerOneWonSets
		// player2.setPoints = playerTwoWonSets
		return bool
	}
	/**
   * Returns a pool where playerPlacement contains all players sorted on the amount of setpoints
   *
   * @param {Player} pool - Input the pool you want sorted
   * @return {Pool} Returns the pool with playerPlacement
   * 
   */
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

const tournamentGenerator = new TournamentGenerator()
export { tournamentGenerator }