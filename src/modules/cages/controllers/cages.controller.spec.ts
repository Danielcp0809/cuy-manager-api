import { Test, TestingModule } from '@nestjs/testing';
import { CagesController } from './cages.controller';

describe('CagesController', () => {
  let controller: CagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CagesController],
    }).compile();

    controller = module.get<CagesController>(CagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
