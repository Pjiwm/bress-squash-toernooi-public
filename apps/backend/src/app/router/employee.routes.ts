import * as router from 'express'
const routes = router.Router()
import { CrudController } from '../controllers/mongo.controller'
import { EmployeeModel } from '../models/employee.model'
import { checkWhiteList, checkAdmin } from '../helpers/employee.middleware'

//TODO: implement generic database controller
const controller: CrudController = new CrudController(EmployeeModel)
routes.post('/', checkWhiteList, checkAdmin, controller.create)
routes.get('/', checkWhiteList, checkAdmin, controller.getAll)
routes.get('/:id', checkWhiteList, controller.getById)
routes.put('/:id', checkWhiteList, checkAdmin, controller.update)
routes.delete('/:id', checkWhiteList, checkAdmin, controller.deleteById)

export default routes