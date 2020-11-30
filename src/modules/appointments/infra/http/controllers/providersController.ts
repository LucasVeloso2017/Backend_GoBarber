import {Request,Response} from 'express'
import {parseISO} from 'date-fns'
import {container} from 'tsyringe'

import ListProvidersService from "@modules/appointments/services/ListProvidersService";

class ProvidersController {

    public async index(request:Request,response:Response){
        const user_id = request.user.id

        const listProvidersService = container.resolve(ListProvidersService)

        const providers = await listProvidersService.execute({
            user_id
        })

        return response.json(providers)
    }


}

export default ProvidersController