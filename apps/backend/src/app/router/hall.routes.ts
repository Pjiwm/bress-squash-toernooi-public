import * as router from 'express'
import { DatabaseInterface } from '../controllers/database.interface'
const routes = router.Router()
import { NeoController } from '../controllers/neo.controller'

const controller: DatabaseInterface = new NeoController('Hall')
routes.post('/', controller.create)
routes.get('/', controller.getAll)
routes.get('/:id', controller.getById)

export default routes