import { Module } from '@nestjs/common';
import { ApartmanService } from './apartman.service';
import { ApartmanController } from './apartman.controller';
import {Apartman} from "./entities/apartman.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Apartman])],
  controllers: [ApartmanController],
  providers: [ApartmanService],
})
export class ApartmanModule {}
