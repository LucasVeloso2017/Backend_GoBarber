import { startOfHour } from 'date-fns';
import {inject,injectable} from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import AppError from '@shared/errors/appError'
import  IAppointmentRepository  from '@modules/appointments/repositories/IAppointmentsRepository';


interface Request{

    provider_id:string,
    date:Date
}

@injectable()
class CreateAppointmentService{

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository:IAppointmentRepository
    ){}


    public async execute({provider_id,date}:Request): Promise<Appointment>{

        const appoimentDate = startOfHour(date)

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appoimentDate)

        if(findAppointmentInSameDate){
            throw new AppError('this appointment this already booked')
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date:appoimentDate
        })

        return appointment
    }

}

export default CreateAppointmentService