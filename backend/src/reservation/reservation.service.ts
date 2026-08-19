import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Apartman } from 'src/apartman/entities/apartman.entity';
import { GetReservationDto } from './dto/get-reservation.dto';




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
      const reservation = this.reservationRepository.create({...createReservationDto, user});
      await this.attachCouponToReservation(createReservationDto.couponCode, reservation);
      return this.reservationRepository.save(reservation);
    });
  }

  private async datesOverlap(createReservationDto: CreateReservationDto, manager: EntityManager){
    const reservation = await manager
    .createQueryBuilder(Reservation, 'reservation')
    .where('reservation.startDate <= :endDate', {endDate: createReservationDto.endDate})
    .andWhere('reservation.endDate >= :startDate', {startDate: createReservationDto.startDate})
    .getOne();
    if(reservation) throw new ConflictException();
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

  /*findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }*/
}
