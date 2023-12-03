import { Test, TestingModule } from '@nestjs/testing';
import { GranttService } from './grantt.service';

describe('GranttService', () => {
  let service: GranttService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GranttService],
    }).compile();

    service = module.get<GranttService>(GranttService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
