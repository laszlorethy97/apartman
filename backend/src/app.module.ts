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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RoleModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', 'Almaspite12*'),
        database: configService.get<string>('DB_NAME', 'apartman'),
        autoLoadEntities: true,
        migrationsRun: true,
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    UserModule,
    ReservationModule,
    CouponModule,
    InvoiceModule,
    ApartmanModule,
    MaintenanceModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}