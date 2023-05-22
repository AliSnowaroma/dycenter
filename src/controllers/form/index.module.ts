import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import FormController from './index.controller'
import FormService from '@/features/form/index.service'
import { Form } from '@/entities/form'
import { User } from '@/entities/User'

@Module({
  imports: [TypeOrmModule.forFeature([Form,  User])],
  controllers: [FormController],
  providers: [FormService],
})
export default class FormModule {}
