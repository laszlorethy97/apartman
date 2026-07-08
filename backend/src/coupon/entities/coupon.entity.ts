import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity()
export class Coupon {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    code!: string;

    @Column()
    discount!: number;

    @Column()
    expirationDate!: Date;

    @OneToOne(() => Reservation, reservation => reservation.coupon)
    reservation!: Reservation | null;
}
