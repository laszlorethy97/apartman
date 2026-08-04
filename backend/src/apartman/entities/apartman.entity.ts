import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Maintenance } from 'src/maintenance/entities/maintenance.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class Apartman {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    price!: number;

    @Column()
    address!: string;

    @Column()
    capacity!: number;

    @OneToMany(() => Reservation, reservation => reservation.apartman)
    reservations!: Reservation[];

    @OneToMany(() => Maintenance, maintance => maintance.apartman)
    maintenances!: Maintenance[];
}
