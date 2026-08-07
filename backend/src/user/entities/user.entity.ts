import { Entity, Column, ManyToMany, PrimaryGeneratedColumn, OneToMany, JoinTable} from 'typeorm'
import { Role } from 'src/role/entities/role.entity'
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userName!: string;

    @Column()
    phone!: string;

    @Column()
    firstname!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Exclude()
    @Column()
    password!: string;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles!: Role[];

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations!: Reservation[];
}
