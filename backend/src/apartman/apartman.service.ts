import { Injectable } from '@nestjs/common';
import { CreateApartmanDto } from './dto/create-apartman.dto';
import { UpdateApartmanDto } from './dto/update-apartman.dto';

@Injectable()
export class ApartmanService {
  create(createApartmanDto: CreateApartmanDto) {
    return 'This action adds a new apartman';
  }

  findAll() {
    return `This action returns all apartman`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apartman`;
  }

  update(id: number, updateApartmanDto: UpdateApartmanDto) {
    return `This action updates a #${id} apartman`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartman`;
  }
}
