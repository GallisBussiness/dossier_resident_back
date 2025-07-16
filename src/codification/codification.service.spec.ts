import { Test, TestingModule } from '@nestjs/testing';
import { CodificationService } from './codification.service';

describe('CodificationService', () => {
  let service: CodificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodificationService],
    }).compile();

    service = module.get<CodificationService>(CodificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
