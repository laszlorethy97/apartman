import { Entity, PrimaryGeneratedColumn, Column , OneToOne} from 'typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity()
export class Invoice {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    amount!: number;

    @Column()
    issuDate!: Date;

    @Column()
    paidAt!: Date;

    @Column()
    stripeID!: string

    @OneToOne(() => Reservation, reservation => reservation.invoice)
    reservation!: Reservation;


}
