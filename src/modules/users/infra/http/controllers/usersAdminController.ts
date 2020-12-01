import {Request,Response} from 'express'
import { container } from 'tsyringe'
import {classToClass} from 'class-transformer'


import CreateUserAdminService from '@modules/users/services/CreateUserAdminService'

class UsersAdminController{

    public async create(request:Request,response:Response):Promise<Response>{
        const{ name,email,password,admin }=request.body

        const createUser = container.resolve(CreateUserAdminService)
    
        const user = await createUser.execute({
            name,email,password,admin
        })
    
        //delete user.password
    
        return response.json(classToClass(user))
    }
}
export default UsersAdminController