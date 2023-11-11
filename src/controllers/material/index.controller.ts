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
  UseGuards,
} from '@nestjs/common'
import MaterialService from '@/features/material/index.service'
import { AddMaterial, QueryId } from '@/controllers/material/index.dto'
import { AuthStrategy } from '@/strategy/auth.strategy.redis'
import { AuthGuard } from '@nestjs/passport'

@Controller('material')
class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get('/id')
  getUser(): string {
    return 'lll'
  }

  @UseGuards(AuthStrategy)
  @Post('/add')
  @HttpCode(200)
  async add(@Body() post: AddMaterial, @Request() req): Promise<any> {
    const { userId } = req
    try {
      const res = await this.materialService.add(post, userId)
      return {
        message: '组件添加成功',
        material: res.identifiers[0],
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Get('/getMaterialList')
  @HttpCode(200)
  async getMaterialList(@Query() query, @Request() req): Promise<any> {
    const { status } = query
    const { userId } = req
    try {
      const res = await this.materialService.getMaterialList(userId, status)
      return {
        materialList: res,
        count: res.length,
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  @Get('/getCommonMaterialList')
  @HttpCode(200)
  async getCommonMaterialList(@Query() query): Promise<any> {
    const { status } = query
    try {
      const res = await this.materialService.getCommonMaterialList()
      return {
        materialList: res,
        count: res.length,
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Get('/getMaterialById')
  @HttpCode(200)
  async getMaterialById(@Query() query: QueryId): Promise<any> {
    const { id } = query
    try {
      const res = await this.materialService.getMaterialById(id)
      return {
        material: res,
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Post('/publishMaterial')
  @HttpCode(200)
  async publishMaterial(@Body() post: DyObj, @Request() req): Promise<any> {
    const { userId } = req
    try {
      const res = await this.materialService.publishMaterial(post)
      return {
        message: '发布成功',
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Post('/updateMaterial')
  @HttpCode(200)
  async update(@Body() post: DyObj, @Request() req): Promise<any> {
    const { userId } = req
    try {
      const res = await this.materialService.updateMaterial(post, userId)
      return {
        message: '更新成功',
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Get('/deleteMaterialById')
  @HttpCode(200)
  async deleteMaterialById(@Query() query: QueryId): Promise<any> {
    const { id } = query
    try {
      const res = await this.materialService.deleteMaterialById(id)
      return {
        message: '删除成功',
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}

export default MaterialController
