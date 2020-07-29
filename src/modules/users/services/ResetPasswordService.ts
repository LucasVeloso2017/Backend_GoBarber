import { inject,injectable } from 'tsyringe';

import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import ISendForgotPasswordMail from '@shared/container/providers/mailProvider/models/ISendForgotPasswordEmail'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

import User from '@modules/users/infra/typeorm/entities/user'


interface Request{
    password:string
    token:string
}

@injectable()
export default class ResetPassword {

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,

        @inject("UsersTokensRepository")
        private userTokensRepository:IUserTokensRepository
    ){}
    
    public async execute({password,token}:Request): Promise<void>{
        const userToken  = await this.userTokensRepository.findByToken(token)
        
        if(!userToken){
            throw new AppError("UserToken doesnt exists")
        }

        const user = await this.userRepository.findById(userToken.user_id)

        if(!user){
            throw new AppError("User doesnt exists")
        }

        user.password = password
        await this.userRepository.save(user)
    }

}