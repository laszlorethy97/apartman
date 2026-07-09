import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApartmanService } from './apartman.service';
import { CreateApartmanDto } from './dto/create-apartman.dto';
import { UpdateApartmanDto } from './dto/update-apartman.dto';

@Controller('apartman')
export class ApartmanController {
  constructor(private readonly apartmanService: ApartmanService) {}

  @Post()
  create(@Body() createApartmanDto: CreateApartmanDto) {
    return this.apartmanService.create(createApartmanDto);
  }

  @Get()
  findAll() {
    return this.apartmanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apartmanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApartmanDto: UpdateApartmanDto) {
    return this.apartmanService.update(+id, updateApartmanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartmanService.remove(+id);
  }
}
