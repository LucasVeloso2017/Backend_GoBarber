import {Request,Response} from 'express'
import {parseISO} from 'date-fns'
import {container} from 'tsyringe'

import ListProvidersService from "@modules/appointments/services/ListProvidersService";
import AdminDeleteProvidersService from "@modules/appointments/services/AdminDeleteProvidersService";

class ProvidersController {

    public async index(request:Request,response:Response){
        const user_id = request.user.id

        const listProvidersService = container.resolve(ListProvidersService)

        const providers = await listProvidersService.execute({
            user_id
        })

        return response.json(providers)
    }

    public async destroy(request:Request,response:Response){

        const { provider_id,admin_id } = request.params

        const adminDeleteProvidersService = container.resolve(AdminDeleteProvidersService)

        const deletedUser = await adminDeleteProvidersService.execute({
            provider_id,
            admin_id
        })
        
        return response.json(deletedUser)
    }


}

export default ProvidersController