import  ICreateUserDto  from '@modules/users/dtos/ICreateUserDto';
import {getRepository,Repository,Not} from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/user'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import IFindAllProviderDto from '@modules/users/dtos/IFindAllProviderDto'

class UsersRepository implements IUserRepository {
    private ormRepository:Repository<User>

    constructor(){
        this.ormRepository = getRepository(User)
    }

    public async findById(id:string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id)
        return user
    }

    public async findByEmail(email:string):Promise<User | undefined>{
        const user = await this.ormRepository.findOne({where:{email}})
        return user
    }

    public async create({name,email,password}:ICreateUserDto):Promise<User>{
        const user = this.ormRepository.create({name,email,password})
        
        await this.ormRepository.save(user)

        return user
    }

    public async save(user:User):Promise<User>{
        return this.ormRepository.save(user)
    }

    public async findAllProviders({ except_user_id, }:IFindAllProviderDto):Promise<User[]>{
        let users:User[]

        if(except_user_id ){
            users = await this.ormRepository.find({
                where:{id:Not(except_user_id)}
            })
        }else{
            users = await this.ormRepository.find()
        }

        return users
    }
}

export default UsersRepository