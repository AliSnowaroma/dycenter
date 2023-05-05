import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import ScreenController from './index.controller'
import ScreenService from '@/features/screen/index.service'
import { Screen } from '@/entities/screen'
import { ScreenMaterial } from '@/entities/screenMaterial'
import { User } from '@/entities/User'


@Module({
  imports: [TypeOrmModule.forFeature([Screen, ScreenMaterial, User])],
  controllers: [ScreenController],
  providers: [ScreenService],
})
export default class MaterialModule {}
