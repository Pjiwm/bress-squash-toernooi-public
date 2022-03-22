import * as router from 'express'
import { DatabaseInterface } from '../controllers/database.interface'
const routes = router.Router()
import { NeoController } from '../controllers/neo.controller'

const poolController: DatabaseInterface = new NeoController('Pool')
const poolMatchController: DatabaseInterface = new NeoController('PoolMatch')
routes.get('/:id', poolController.getById)
routes.post('/:id/poolmatch', poolMatchController.create1deep)
routes.get('/:id/poolmatch', poolMatchController.getAll1deep)

export default routes