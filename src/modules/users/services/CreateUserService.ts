import { inject,injectable } from 'tsyringe';
import { hash } from 'bcryptjs'


import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/user'


interface Request{
    name:string,
    email:string,
    password:string
}

@injectable()
class CreateUserService{
    
    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository
    ){}
    
    public async execute({name,email,password}:Request): Promise<User>{

        const checkUserExists = await this.userRepository.findByEmail(email) 
        
        if(checkUserExists){
            throw new AppError('This email already exists')
        }

        const hashedPassword = await hash(password,8)


        const user = this.userRepository.create({
            name,
            email,
            password:hashedPassword
        })
        
        return user
    }


}

export default CreateUserService