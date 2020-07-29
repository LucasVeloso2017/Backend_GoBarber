import { inject,injectable } from 'tsyringe';

import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import ISendForgotPasswordMail from '@shared/container/providers/mailProvider/models/ISendForgotPasswordEmail'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

import User from '@modules/users/infra/typeorm/entities/user'


interface Request{
    email:string
}

@injectable()
export default class SendForgotEmailPasswordService {

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,

        @inject("MailProvider")
        private mailProvider:ISendForgotPasswordMail,

        @inject("UsersTokensRepository")
        private userTokensRepository:IUserTokensRepository
    ){}
    
    public async execute({email}:Request): Promise<void>{
       
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new AppError("User does not exist")
        }

        await this.userTokensRepository.generate(user.id)

        this.mailProvider.sendMail(email,"Pedido de Senha")
    }

}