import { Match, Tournament } from '../../../../../libs/models'
import { Queue } from 'queue-typescript'
import { tournamentGenerator } from '../services/tournament.service'
import neo = require('../../../neo')
export class NeoQueue {
	/* istanbul ignore next */
	async generateQueueForPool(tournament : Tournament,tournamentId : string){
		console.warn('Untested method!')
		const queueArray = tournamentGenerator.generateQueueForPool(tournament).toArray()
		await this.enqueue('PoolMatch',queueArray,tournament,tournamentId)
	}
	/* istanbul ignore next */
	async enqueueKnockoutMatchesFromDivision(tournament : Tournament,tournamentId : string){
		console.warn('Untested method!')
		const array : Match[] = []
		const queue = new Queue<Match>(...array)
		let queueArray : Array<Match> = []
		for(let i = 0; i < tournament.divisions.length; i++){
			queueArray = queueArray.concat(tournamentGenerator.enqueueKnockoutMatchesFromDivision(tournament.divisions[i],queue).toArray()) 
		}
		this.enqueue('KOMatch',queueArray,tournament,tournamentId)
	}
	/* istanbul ignore next */
	async enqueue(matchType : string,array : Array<Match>,tournament : Tournament,tournamentId : string){
		console.warn('Untested method!')
		const results = []
		const session = neo.session()
		results.push(await session.run('MATCH (tournament :Tournament{_id: $tournamentId }) MERGE (q:Queue{_id: apoc.create.uuid()})-[:IS_PART_OF]->(tournament)',
			{
				tournamentId: tournamentId,
			}))
		results.push(await session.run(`MATCH (q:Queue)-[:IS_PART_OF]->(:Tournament{_id: $tournamentId }) MATCH (match0: ${matchType}{_id: $id}) MERGE (q)-[:TAIL]->(match0)`,
			{
				tournamentId: tournamentId,
				id: array[0]._id,
			})) 
		for(let i = 1; i < array.length-1; i++){
			results.push(await session.run(`MATCH (match0:${matchType}{_id: $id0}) MATCH (match1:${matchType}{_id: $id1}) MERGE (match0)-[:PREVIOUS]->(match1)`,
				{
					tournamentId: tournamentId,
					id0: array[i]._id,
					id1: array[i-1]._id
				})) 
		}
		results.push(await session.run(`MATCH (q:Queue)-[:IS_PART_OF]->(:Tournament{_id: $tournamentId }) MATCH (match0:${matchType}{_id: $id0}) MATCH (match1:${matchType}{_id: $id1})  MERGE (q)-[:HEAD]->(match0) MERGE (match0)-[:PREVIOUS]->(match1)`,
			{
				tournamentId: tournamentId,
				id0: array[array.length-1]._id,
				id1: array[array.length-2]._id
			}))
		await Promise.all(results).then(() => session.close())
	}
}