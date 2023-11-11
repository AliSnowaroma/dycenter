import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import MaterialController from './index.controller'
import MaterialService from '@/features/material/index.service'
import { Material } from '@/entities/Material'
import { User } from '@/entities/User'

@Module({
  imports: [TypeOrmModule.forFeature([Material, User])],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export default class MaterialModule {}
