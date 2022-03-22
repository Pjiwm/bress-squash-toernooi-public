import * as router from 'express'
import { MatchController } from '../controllers/match.controller'
//import { DatabaseInterface } from '../controllers/database.interface'
//import { NeoController } from '../controllers/neo.controller'
const routes = router.Router()
import { NeoGenerate } from '../controllers/neoGenerate.controller'
import { NeoTournament } from '../controllers/tournament.controller'

//TODO: make generic
const generationController: NeoGenerate = new NeoGenerate('Tournament')
const tournamentController : NeoTournament = new NeoTournament('Tournament')
const matchController : MatchController = new MatchController()
routes.post('/', tournamentController.create)
routes.get('/', generationController.getAll)
routes.get('/:id', tournamentController.getById)
routes.post('/:id/poolgeneration', generationController.generatePools)
routes.post('/:id/kogeneration', generationController.generateKo)
routes.post('/:id/finalsgeneration', generationController.generateFinals)
routes.get('/:id/player/count', tournamentController.getPlayerCount)
routes.get('/:id/division', generationController.getAll1deep)
routes.get('/:id/player', tournamentController.getPlayers)
routes.get('/:id/match',matchController.getAll)
routes.put('/:id', tournamentController.update)
//routes.post('/:id/player', playerController. )
export default routes
