import {
  Req,
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  InternalServerErrorException,
  UseInterceptors,
  Res,
  Query,
  Request,
  UseGuards
} from '@nestjs/common'
import FormService from '@/features/form/index.service'
import { AddForm, UpdateForm, QueryId } from '@/controllers/form/index.dto'
import { AuthStrategy } from '@/strategy/auth.strategy.redis'
import { AuthGuard } from '@nestjs/passport';

@Controller('form')
class FormController {
  constructor(
    private readonly formService: FormService
  ){}


  @UseGuards(AuthStrategy)
  @Post('/add')
  @HttpCode(200)
  async add (@Body() post: AddForm,  @Request() req): Promise<any> {
    const { userId } = req
    try {
    const res =  await this.formService.add(post, userId)
     return {
       message: '表单添加成功',
       ...res
     }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Get('/getFormList')
  @HttpCode(200)
  async getFormList (@Query() query, @Request() req): Promise<any> {
    const { status } = query
    const { userId } = req
     try {
    const res =  await this.formService.getFormList(userId, status)
     return {
       formList: res,
       count: res.length
     }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Get('/getFormById')
  @HttpCode(200)
  async getFormById (@Query() query: QueryId): Promise<any> {
    const { id } = query
    try {
    const res =  await this.formService.getFormById(id)
     return {
       form: res
     }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Post('/publishForm')
  @HttpCode(200)
  async publishForm (@Body() post: UpdateForm, @Request() req): Promise<any> {
    const { userId } = req
    try {
    const res =  await this.formService.publishForm(post)
     return {
       message: '发布成功'
     }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Post('/updateForm')
  @HttpCode(200)
  async update (@Body() post: UpdateForm, @Request() req): Promise<any> {
    const { userId } = req
    try {
     await this.formService.updateForm(post, userId)
     return {
       message: '更新成功'
     }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Get('/deleteFormById')
  @HttpCode(200)
  async deleteFormById (@Query() query: QueryId): Promise<any> {
    const { id } = query
    try {
    const res =  await this.formService.deleteFormById(id)
     return {
       message: '删除成功'
     }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}



export default FormController
