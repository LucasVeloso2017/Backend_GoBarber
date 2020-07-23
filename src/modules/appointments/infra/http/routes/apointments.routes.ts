import {Router} from 'express'

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'
import AppointmentsController from '@modules/appointments/infra/controllers/appointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
appointmentsRouter.use(ensureAuth)

appointmentsRouter.post('/',appointmentsController.create)

/*
appointmentsRouter.get('/',async(request,response)=>{

    const appointments = await appointmentsRepository.find()

    return response.json(appointments)
})
*/

export default appointmentsRouter