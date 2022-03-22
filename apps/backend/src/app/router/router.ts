import * as router from 'express'
const apiRoutes = router.Router()
import employeeRoutes from './employee.routes'
import tournamentRoutes from './tournament.routes'
import divisionRoutes from './division.routes'
import hallRoutes from './hall.routes'
import playerRoutes from './player.routes'
import poolRoutes from './pool.routes'
import poolMatchRoutes from './poolmatch.routes'
import koMatchRoutes from './komatch.routes'
import setRoutes from './set.routes'

apiRoutes.use('/employee', employeeRoutes)
apiRoutes.use('/tournament', tournamentRoutes)
apiRoutes.use('/division', divisionRoutes)
apiRoutes.use('/hall', hallRoutes)
apiRoutes.use('/player', playerRoutes)
apiRoutes.use('/pool', poolRoutes)
apiRoutes.use('/poolmatch', poolMatchRoutes)
apiRoutes.use('/komatch', koMatchRoutes)
apiRoutes.use('/set', setRoutes)
apiRoutes.use('/match', setRoutes)
apiRoutes.get('', (req, res) => {
	res.send({
		message: 'Welcome to backend!',
	})
})


export default apiRoutes
