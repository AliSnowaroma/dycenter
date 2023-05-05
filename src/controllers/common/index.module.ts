import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import CommonController from './index.controller'
import CommonService from '@/features/common/index.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CommonController],
  providers: [CommonService],
})
export default class MaterialModule {}
