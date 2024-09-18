import { Test, TestingModule } from '@nestjs/testing';
import { CagesService } from './cages.service';

describe('CagesService', () => {
  let service: CagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CagesService],
    }).compile();

    service = module.get<CagesService>(CagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
