import { inject,injectable } from 'tsyringe';


import  IAppointmentsRepository  from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from './../infra/typeorm/entities/appointment';

interface Request{
    provider_id:string
    day:number
    month:number
    year:number

}

@injectable()
class ListProviderAppointmentsService{

    constructor(
        @inject("AppointmentsRepository")
        private appoitmentsRepository:IAppointmentsRepository

    ){}
    
    public async execute({provider_id,day,month,year}:Request): Promise<Appointment[]>{
        const appointments = await this.appoitmentsRepository.findAllInDayFromProvider({
            provider_id,day,month,year
        })

        return appointments
    }
}

export default ListProviderAppointmentsService