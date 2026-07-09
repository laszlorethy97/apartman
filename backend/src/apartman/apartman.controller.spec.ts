import { Test, TestingModule } from '@nestjs/testing';
import { ApartmanController } from './apartman.controller';
import { ApartmanService } from './apartman.service';

describe('ApartmanController', () => {
  let controller: ApartmanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartmanController],
      providers: [ApartmanService],
    }).compile();

    controller = module.get<ApartmanController>(ApartmanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
