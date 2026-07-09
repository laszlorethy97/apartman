import { Test, TestingModule } from '@nestjs/testing';
import { ApartmanService } from './apartman.service';

describe('ApartmanService', () => {
  let service: ApartmanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApartmanService],
    }).compile();

    service = module.get<ApartmanService>(ApartmanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
