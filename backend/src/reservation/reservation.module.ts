import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { User } from 'src/user/entities/user.entity';
import { Apartman } from 'src/apartman/entities/apartman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Coupon, User, Apartman])],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
