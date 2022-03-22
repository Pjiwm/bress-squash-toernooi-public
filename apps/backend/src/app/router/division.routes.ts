import * as router from 'express'
import { DatabaseInterface } from '../controllers/database.interface'
const routes = router.Router()
import { NeoController } from '../controllers/neo.controller'

const divisionController: DatabaseInterface = new NeoController('Division')
const playerController: DatabaseInterface = new NeoController('Player')
const poolController: DatabaseInterface = new NeoController('Pool')
const koMatchController: DatabaseInterface = new NeoController('KoMatch')
routes.post('/', divisionController.create)
routes.get('/', divisionController.getAll)
routes.get('/:id', divisionController.getById)
routes.post('/:id/player', playerController.create1deep)
routes.get('/:id/player', playerController.getAll1deep)
routes.post('/:id/pool', poolController.create1deep)
routes.get('/:id/pool', poolController.getAll1deep)
routes.post('/:id/komatch', koMatchController.create1deep)
routes.get('/:id/komatch', koMatchController.getAll1deep)
// routes.put('/:id', controller.update)
// routes.delete('/:id', controller.deleteById)

export default routes