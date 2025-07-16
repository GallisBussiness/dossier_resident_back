import { Test, TestingModule } from '@nestjs/testing';
import { CodificationController } from './codification.controller';
import { CodificationService } from './codification.service';

describe('CodificationController', () => {
  let controller: CodificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodificationController],
      providers: [CodificationService],
    }).compile();

    controller = module.get<CodificationController>(CodificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
