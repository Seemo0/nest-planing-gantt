import { Test, TestingModule } from '@nestjs/testing';
import { GranttController } from './events.controller';

describe('GranttController', () => {
  let controller: GranttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GranttController],
    }).compile();

    controller = module.get<GranttController>(GranttController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
