import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [ReservationModule],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
