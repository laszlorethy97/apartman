import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Apartman } from 'src/apartman/entities/apartman.entity';
import { GetReservationDto } from './dto/get-reservation.dto';
import { Maintenance } from 'src/maintenance/entities/maintenance.entity';
import { ObjectLiteral } from 'typeorm';




@Injectable()
export class ReservationService {

  constructor(
    private readonly dataSource: DataSource,
     @InjectRepository(Reservation)
      private readonly reservationRepository: Repository<Reservation>,
      @InjectRepository(Coupon)
      private readonly couponRepository: Repository<Coupon>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      @InjectRepository(Apartman)
      private readonly apartmanRepository: Repository<Apartman>
  ){}

  public async create(userId: number, createReservationDto: CreateReservationDto) {
    if(!this.isValideDate(createReservationDto.startDate, createReservationDto.endDate)) throw new BadRequestException();
    return this.dataSource.transaction(async (manager) => {
      const apartman = await manager.findOne(Apartman, {
        where: {id: 1},
        lock: {mode: 'pessimistic_write'}
      });
      if(!apartman) throw new NotFoundException();
      await this.datesOverlap(createReservationDto, manager);
      const user = await this.userRepository.findOneBy({id: userId});
      if(!user) throw new NotFoundException();
      const reservation = this.reservationRepository.create({...createReservationDto, user, apartman});
      await this.attachCouponToReservation(createReservationDto.couponCode, reservation);
      return this.reservationRepository.save(reservation);
    });
  }

  private async datesOverlap(createReservationDto: CreateReservationDto, manager: EntityManager){
    await this.overlap(createReservationDto, manager, Reservation);
    await this.overlap(createReservationDto, manager, Maintenance);
  }

  private async overlap
  <T extends ObjectLiteral & {startDate: string; endDate: string }>
  (createReservationDto: CreateReservationDto, manager: EntityManager, object: EntityTarget<T>){
    const entity = await manager
    .createQueryBuilder(object, 'object')
    .where('object.startDate <= :endDate', {endDate: createReservationDto.endDate})
    .andWhere('object.endDate >= :startDate', {startDate: createReservationDto.startDate})
    .getOne();
    if(entity) throw new ConflictException();
  }

  private async attachCouponToReservation(couponCode: string, reservation: Reservation){
    if(couponCode && couponCode!= "" ){
      const coupon = await this.couponRepository.findOneBy({code: couponCode});
      if(!coupon) throw new NotFoundException();
      reservation.coupon = coupon;
    }
  }

  private isValideDate(start: Date, end: Date): boolean{
    const startDate = new Date(start);
    const endDate = new Date(end);
    if(isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return false;
    }
    return startDate < endDate || startDate.getTime() === endDate.getTime();
  }

  public async findAll(): Promise<GetReservationDto[]>{
    return (await this.reservationRepository.find()).map((res) =>{
      return {startDate: res.startDate, endDate: res.endDate}
    });
  }
}
