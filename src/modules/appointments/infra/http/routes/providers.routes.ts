import {Router} from 'express'
import { celebrate,Segments,Joi } from 'celebrate'


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

providersRoutes.delete('/:admin_id/delete-users/:provider_id',providersController.destroy)

providersRoutes.get('/:provider_id/month-availability',celebrate({
    [Segments.PARAMS]:{
        provider_id:Joi.string().uuid().required()
    }
}),monthAvailableController.index)
providersRoutes.get('/:provider_id/day-availability',celebrate({
    [Segments.PARAMS]:{
        provider_id:Joi.string().uuid().required()
    }
}),dayAvailableController.index)

export default providersRoutes