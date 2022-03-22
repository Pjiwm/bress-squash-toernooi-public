import * as router from 'express'
import { DatabaseInterface } from '../controllers/database.interface'
const routes = router.Router()
import { NeoController } from '../controllers/neo.controller'

const controller: DatabaseInterface = new NeoController('Set')
routes.get('/:id', controller.getById)
routes.post('/:id', controller.getById)
export default routes