import { startOfHour,isBefore,getHours } from 'date-fns';
import {inject,injectable} from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import AppError from '@shared/errors/appError'
import  IAppointmentRepository  from '@modules/appointments/repositories/IAppointmentsRepository';


interface Request{

    provider_id:string
    user_id:string
    date:Date
}

@injectable()
class CreateAppointmentService{

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository:IAppointmentRepository
    ){}


    public async execute({provider_id,user_id,date}:Request): Promise<Appointment>{

        const appointmentDate = startOfHour(date)

        if(isBefore(appointmentDate, new Date(Date.now()))){
            throw new AppError('You cant create appointment in past date')
        }

        if(provider_id === user_id){
            throw new AppError('You cant create an appointment with yourself')
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)

        if(findAppointmentInSameDate){
            throw new AppError('this appointment this already booked')
        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
            throw new AppError('You cant only create appointments between 8:00 to 17:00 ')
        }


        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date:appointmentDate
        })

        return appointment
    }

}

export default CreateAppointmentService