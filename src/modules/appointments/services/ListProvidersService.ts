import { inject,injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user'
import  IUserRepository  from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';

interface Request{
    user_id:string
}


@injectable()
class ListProvidersService{

    constructor(
        @inject("UsersRepository")
        private userRepository:IUserRepository,
    ){}
    
    public async execute({user_id}:Request): Promise<User[]>{
        const users = await this.userRepository.findAllProviders({except_user_id:user_id})
       
        return users
    }
}

export default ListProvidersService