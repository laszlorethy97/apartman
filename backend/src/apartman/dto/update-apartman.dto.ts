import { PartialType } from '@nestjs/mapped-types';
import { CreateApartmanDto } from './create-apartman.dto';

export class UpdateApartmanDto extends PartialType(CreateApartmanDto) {}
