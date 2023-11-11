import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserController from './index.controller'
import UserService from '@/features/user/index.service'
import CommonService from '@/features/common/index.service'
import { User } from '@/entities/User'
import { PassportModule } from '@nestjs/passport'
import { LoginStragegy } from '@/strategy/login.strategy'
import { JwtService, JwtModule } from '@nestjs/jwt'
import { JWT } from '@/constants'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: JWT.secret,
      signOptions: { expiresIn: JWT.expireTime },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LoginStragegy, CommonService],
})
export default class UserModule {}
