import  ICreateAppointmentDto  from '@modules/appointments/dtos/ICreateAppointmentDto';
import {getRepository,Repository,Raw} from 'typeorm'

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import IFindAllInMonthDto from '@modules/appointments/dtos/IFindAllInMonthDto'
import IFindAllInDayDto from '@modules/appointments/dtos/IFindAllInDayDto'

class AppointmentstRepository implements IAppointmentRepository {
    private ormRepository:Repository<Appointment>

    constructor(){
        this.ormRepository = getRepository(Appointment)
    }

    public async findByDate(date:Date): Promise<Appointment | undefined> {
       
        const findAppointment = await this.ormRepository.findOne({
            where:{ date }
        })

        return findAppointment
    }

    public async create({provider_id,user_id,date}:ICreateAppointmentDto):Promise<Appointment>{
        
        const appointment = this.ormRepository.create({provider_id,user_id,date})
        await this.ormRepository.save(appointment)
        return appointment
    }

    public async findAllInMonthFromProvider({provider_id,month,year}:IFindAllInMonthDto):Promise<Appointment[]>{
        const parsedMonth = String(month).padStart(2,'0')

        const appointment = await this.ormRepository.find({
            where:{
                provider_id,
                date:Raw(dateFieldName => 
                    `to_char(${dateFieldName},'MM-YYYY') = '${parsedMonth}-${year}'`
                ),
            }
        })

        return appointment
    }

    public async findAllInDayFromProvider({provider_id,day,month,year}:IFindAllInDayDto):Promise<Appointment[]>{
        const parsedMonth = String(month).padStart(2,'0')
        const parsedDay = String(day).padStart(2,'0')


        const appointment = await this.ormRepository.find({
            where:{
                provider_id,
                date:Raw(dateFieldName => 
                    `to_char(${dateFieldName},'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                ),
            }
        })

        return appointment
    }
}

export default AppointmentstRepository