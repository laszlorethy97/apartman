import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Apartman } from "src/apartman/entities/apartman.entity";

@Entity()
export class Maintenance {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @ManyToOne(() => Apartman, apartman => apartman.maintenances)
    apartman!: Apartman

}
