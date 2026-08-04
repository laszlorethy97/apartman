import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type!: string;

    @ManyToMany(() => User, user => user.roles)
    users!: User[];
}
