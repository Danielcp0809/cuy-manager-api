import { Test, TestingModule } from '@nestjs/testing';
import { EntriprisesController } from './entriprises.controller';

describe('EntriprisesController', () => {
  let controller: EntriprisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntriprisesController],
    }).compile();

    controller = module.get<EntriprisesController>(EntriprisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
