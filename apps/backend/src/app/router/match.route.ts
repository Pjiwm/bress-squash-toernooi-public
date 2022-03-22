import * as router from 'express'
import { MatchController } from '../controllers/match.controller'
const routes = router.Router()

//generic match get requests
const matchController: MatchController = new MatchController()
routes.get('/:id', matchController.getById)
routes.get('/:id/set', matchController.getAll1deep)

export default routes