import * as router from 'express'
import { DatabaseInterface } from '../controllers/database.interface'
const routes = router.Router()
import { NeoController } from '../controllers/neo.controller'
import { NeoSet } from '../controllers/neoSet.controller'

const koMatchController: DatabaseInterface = new NeoController('KoMatch')
const setController: DatabaseInterface = new NeoSet('KoMatch')
routes.get('/:id', koMatchController.getById)
routes.post('/:id/set', setController.create1deep)
routes.get('/:id/set', setController.getAll1deep)

export default routes