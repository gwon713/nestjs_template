import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GatewayModule } from '../src/gateway.module';
import { CommonModule } from '@libs/common';
import { GatewayController } from '../src/gateway.controller';
import { GatewayService } from '../src/gateway.service';
import { AUTH_FACTORY } from '@libs/common/factory';
import { ClientProxy } from '@nestjs/microservices';

describe('GatewayController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [GatewayController],
      providers: [GatewayService, AUTH_FACTORY],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
