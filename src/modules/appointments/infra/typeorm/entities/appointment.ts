import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, 
    ManyToOne,
    JoinColumn 
} from 'typeorm'

import user from '@modules/users/infra/typeorm/entities/user'

@Entity('appointments')
class Appointment{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider_id: string

    @ManyToOne(()=> user)
    @JoinColumn({name:'provider_id'})
    provider:user

    @Column()
    user_id: string

    @ManyToOne(()=> user)
    @JoinColumn({name:'user_id'})
    user:user

    @Column('timestamp with time zone')
    date: Date

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}

export default Appointment