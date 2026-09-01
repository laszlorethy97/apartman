import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ReservationModule } from 'src/reservation/reservation.module';
import { ApartmanModule } from 'src/apartman/apartman.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartman } from 'src/apartman/entities/apartman.entity';

@Module({
  imports: [ReservationModule, ApartmanModule, TypeOrmModule.forFeature([Apartman])],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
