import  Appointment  from '@modules/appointments/infra/typeorm/entities/appointment';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto'
export default interface IAppointmentsRepository{

    findByDate(date:Date):Promise<Appointment | undefined>
    create(data:ICreateAppointmentDto):Promise<Appointment>

}