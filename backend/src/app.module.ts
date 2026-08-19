import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { CouponModule } from './coupon/coupon.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ApartmanModule } from './apartman/apartman.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RoleModule,ConfigModule.forRoot({'isGlobal': true}), TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Almaspite12*',
    database: 'apartman',
    autoLoadEntities: true,
  }), UserModule, ReservationModule, CouponModule, InvoiceModule, ApartmanModule, MaintenanceModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
