import {Router} from 'express'

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'
import ProvidersController from '@modules/appointments/infra/controllers/providersController'

const providersRoutes = Router()
const providersController = new ProvidersController()

providersRoutes.use(ensureAuth)
providersRoutes.get('/',providersController.index)

export default providersRoutes