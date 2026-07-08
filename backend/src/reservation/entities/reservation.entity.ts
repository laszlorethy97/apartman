import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , OneToOne, JoinColumn} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column()
    status!: string;

    @Column()
    isSeason!: boolean;

    @ManyToOne(() => User, user => user.id)
    user!: User;

    @OneToOne(() => Coupon, coupon => coupon.reservation, { nullable: true })
    @JoinColumn()
    coupon!: Coupon | null;

    @OneToOne(()=> Invoice, invoice => invoice.reservation, { nullable: true })
    @JoinColumn()
    invoice!: Invoice | null;

}
