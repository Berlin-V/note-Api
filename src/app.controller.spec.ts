import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    AppService = moduleRef.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

describe('createUser', () => {
    it('should return an array of app', async () => {
      const result = ['test'];
      jest.spyOn(catsService, 'createUser').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
