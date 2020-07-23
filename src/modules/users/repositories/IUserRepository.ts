import User from '@modules/users/infra/typeorm/entities/user'
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto'


export default interface IUserRepository{

    findById(id:string):Promise<User | undefined>
    findByEmail(email:string):Promise<User | undefined>
    create(data:ICreateUserDto):Promise<User>
    save(user:User):Promise<User>
}