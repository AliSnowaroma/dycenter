import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import IndexModule from './controllers/index.module'
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@/config'
const { host, port, username, password, database } = config.mysqlConfig

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      synchronize: true,
      logging: process.env.API_ENV !== 'real', // 是否在控制台打印信息
      autoLoadEntities: true
    }),
    forwardRef(() => IndexModule)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
