import {Request,Response} from 'express'
import {container} from 'tsyringe'

import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";

class ProviderAppointmentsController {

    public async index(request:Request,response:Response){
        
        const provider_id = request.user.id

        const { day,month,year } = request.body


        const listProviderAppointmentService = container.resolve(ListProviderAppointmentsService)

        const appointments = await listProviderAppointmentService.execute({
            day,
            month,
            year,
            provider_id
        })

        return response.json(appointments)
    }


}

export default ProviderAppointmentsController