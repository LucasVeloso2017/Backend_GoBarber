import {Router} from 'express'

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'
import ProvidersController from '@modules/appointments/infra/http/controllers/providersController'
import DayAvailableController from '@modules/appointments/infra/http/controllers/monthAvailableController'
import MonthAvailableController from '@modules/appointments/infra/http/controllers/dayAvailableController'

const providersRoutes = Router()
const providersController = new ProvidersController()
const monthAvailableController = new MonthAvailableController()
const dayAvailableController = new DayAvailableController()

providersRoutes.use(ensureAuth)
providersRoutes.get('/',providersController.index)
providersRoutes.get('/:provider_id/month-availability',monthAvailableController.index)
providersRoutes.get('/:provider_id/day-availability',dayAvailableController.index)

export default providersRoutes