import {Request,Response} from 'express'
import { container } from 'tsyringe'
import {classToClass} from 'class-transformer'


import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

class UsersController{

    public async create(request:Request,response:Response):Promise<Response>{
        const{ name,email,password }=request.body

        const createUser = container.resolve(CreateUserService)
    
        const user = await createUser.execute({
            name,email,password
        })
    
        //delete user.password
    
        return response.json(classToClass(user))
    }

    public async store(request:Request,response:Response):Promise<Response>{
        const updateUserAvatar = container.resolve(UpdateUserAvatarService)

        const user = await updateUserAvatar.execute({
            user_id:request.user.id,
            avatarFilename:request.file.filename
        })
        //delete user.password
    
        return response.json(classToClass(user))
    }


}
export default UsersController