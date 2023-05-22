import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { getConnectionOptions, getConnectionManager, createConnection } from 'typeorm'
import { DataInterceptor } from '@/interceptors/data.interceptor'
import * as cookieParser from 'cookie-parser'
import { uLogger, uRedis  } from '@/utils'
import { C_ERROR } from '@/constants'
import { HttpErrorFilter } from '@/common/filters/httpError.filter'
import config from './config'
import corsOptionsDelegate from '@/common/cors'
import { FreshTokenStrategy } from '@/strategy/freshToken.strategy'
import getUser from '@/middleware/getUser'
import getconnection from '@/common/connect/dycenter'

function connectRedis (): void {
  uRedis.client.on('error', function (error: any) {
    uLogger.logger.error({ ...C_ERROR.REDIS_CONNECT, track: error })
  })
  .once('connect', function () {
    uLogger.logger.info('Redis:数据库连接成功')
  })


  uRedis.client.connect();

}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.useStaticAssets('public', {
    prefix: ''
  })

  app.use(getUser)

  app.enableCors(corsOptionsDelegate)
  app.setGlobalPrefix('api');

  // 注册全局http异常过滤器
  app.useGlobalFilters(new HttpErrorFilter())
  app.useGlobalInterceptors(new DataInterceptor())
  app.useGlobalGuards(new FreshTokenStrategy());
  app.useGlobalPipes(new ValidationPipe({
    // transform: true,
    // whitelist: true,
    // forbidNonWhitelisted: true,
    // // skipMissingProperties: false,
    // forbidUnknownValues: false, // 多传了入参，报错
  }))
  app.use(cookieParser())
  try {
    await app.listen(3000)
    console.log('启动成功')
  } catch (error) {
    console.log(error)
    uLogger.logger.error({ ...C_ERROR.APP_LISTEN, track: error })

    return
  }
  const { mysqlConfig } = config
  uLogger.logger.info(`Node(${mysqlConfig.port}):连接成功`)

}

// connectDB()
connectRedis()
bootstrap();
