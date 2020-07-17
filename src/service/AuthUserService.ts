import {getRepository} from 'typeorm'
import { compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

import AppError from '../errors/appError'

import authConfig from '../config/config'


import User from '../models/user'

interface Request{
    email:string,
    password:string
}
interface Response{
    user:User,
    token:string
}

class AuthUserService{

    public async execute({email,password}:Request):Promise<Response>{
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne({
            where:{email}
        })

        if(!user){
            throw new AppError('Incorrect Email/Password',401)
        }

        const passwordMacthed = await compare(password, user.password)

        if(!passwordMacthed){
            throw new AppError('Incorrect Email/Password',401)
        }

        const{ secret , expiresIn}=authConfig.jwt

        const token = sign({ 

        },
        secret,
        {
            subject:user.id,
            expiresIn
        })

        return { user,token }

    }   


}
export default AuthUserService