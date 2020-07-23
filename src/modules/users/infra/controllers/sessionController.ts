import {Request,Response} from 'express'
import { container } from 'tsyringe'

import AuthUserService from '@modules/users/services/AuthUserService'

class sessionController{

    public async create(request:Request,response:Response){
        const{email,password}= request.body
 
        const authenticateUser = container.resolve(AuthUserService)
            
        const { user, token } = await authenticateUser.execute({
            email,
            password
        })
        
        delete user.password
        return response.json({ user,token })
    }

}
export default sessionController