import {Router, response } from 'express'
import {parseISO} from 'date-fns'
import { getCustomRepository} from 'typeorm'

import AppointmentRepository from '../repositories/appointmentsRepositories'
import CreateAppointmentService from "../service/CreateAppointmentService";

import ensureAuth from '../middlewares/ensureAuth'


const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuth)

appointmentsRouter.post('/',async (request,response)=>{

    const {provider_id,date} = request.body

    const parsedDate =parseISO(date)

    const createAppointmentService = new CreateAppointmentService()

    const appointment = await createAppointmentService.execute({
        date:parsedDate,
        provider_id
    })

    return response.json(appointment)
})

appointmentsRouter.get('/',async(request,response)=>{

    const appointmentsRepository = getCustomRepository(AppointmentRepository)
    const appointments = await appointmentsRepository.find()

    return response.json(appointments)
})


export default appointmentsRouter