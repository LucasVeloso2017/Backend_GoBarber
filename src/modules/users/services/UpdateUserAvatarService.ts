import User from '@modules/users/infra/typeorm/entities/user'
import path from 'path'
import fs from 'fs'
import { inject,injectable } from 'tsyringe';


import AppError from '@shared/errors/appError'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import uploadConfig from '@config/upload'

interface Request{
    user_id:string,
    avatarFilename:string
}


@injectable()
class UpdateUserAvatarService{

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository
    ){}
    
    public async execute({user_id,avatarFilename}:Request): Promise<User>{

        const user = await this.userRepository.findById(user_id)

        if(!user){
            throw new AppError('Error not authenticate',401)
        }

        if(user.avatar){

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath)

            if(userAvatarFileExist){
                await fs.promises.unlink(userAvatarFilePath)

            }

                       
        }

        user.avatar = avatarFilename

        await this.userRepository.save(user)

        return user
    }




}

export default UpdateUserAvatarService