import './providers'
import { container } from 'tsyringe'

import AppointmentsRepository  from '@modules/appointments/infra/typeorm/repositories/appointmentsRepositories';
import  IAppointmentsRepository  from '@modules/appointments/repositories/IAppointmentsRepository';

import  IUserRepository from '@modules/users/repositories/IUserRepository';
import  UsersRepository  from '@modules/users/infra/typeorm/repositories/usersRepositoy';


container.registerSingleton<IUserRepository>('UsersRepository',UsersRepository)

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository',AppointmentsRepository)

