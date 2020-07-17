import { startOfHour } from 'date-fns';
import Appoiment from '../models/appointment'
import AppointmentsRepository from '../repositories/appointmentsRepositories'

import AppError from '../errors/appError'

import { getCustomRepository } from 'typeorm'

interface Request{

    provider_id:string,
    date:Date
}

class CreateAppointmentService{

    public async execute({provider_id,date}:Request): Promise<Appoiment>{

        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appoimentDate = startOfHour(date)

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appoimentDate)

        if(findAppointmentInSameDate){
            throw new AppError('this appointment this already booked')
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date:appoimentDate
        })

        await appointmentsRepository.save(appointment)

        return appointment
    }

}

export default CreateAppointmentService