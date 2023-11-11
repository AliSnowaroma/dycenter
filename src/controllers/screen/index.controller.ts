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
import ScreenService from '@/features/screen/index.service'
import {
  AddScreen,
  QueryId,
  UpdateScreen,
} from '@/controllers/screen/index.dto'
import { AuthStrategy } from '@/strategy/auth.strategy.redis'

@Controller('/screen')
class ScreenController {
  private connection
  constructor(private readonly screenService: ScreenService) {}

  /**
   * @description 创建大屏
   * @returns {Promise<string>}
   * @memberof ScreenController
   */
  @UseGuards(AuthStrategy)
  @Post('/add')
  @HttpCode(200)
  async add(@Body() post: AddScreen, @Request() req): Promise<any> {
    const { userId } = req
    try {
      const res = await this.screenService.add(post, userId)
      return {
        message: '创建成功',
        id: res.id,
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * @description 更新大屏
   * @returns {Promise<string>}
   * @memberof ScreenController
   */
  @UseGuards(AuthStrategy)
  @Post('/updateScreen')
  @HttpCode(200)
  async update(@Body() post: UpdateScreen, @Request() req): Promise<any> {
    const { userId } = req
    try {
      const res = await this.screenService.update(post, userId)
      return {
        message: '保存成功',
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * @description 更新大屏基本信息
   * @returns {Promise<string>}
   * @memberof ScreenController
   */
  @UseGuards(AuthStrategy)
  @Post('/updateScreenBasic')
  @HttpCode(200)
  async updateScreenBasic(
    @Body() post: AddScreen,
    @Request() req,
  ): Promise<any> {
    const { userId } = req
    try {
      const res = await this.screenService.updateScreenBasic(post, userId)
      return {
        message: '更新成功',
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * @description 发布大屏
   * @returns {Promise<string>}
   * @memberof ScreenController
   */
  @UseGuards(AuthStrategy)
  @Post('/publishScreen')
  @HttpCode(200)
  async publish(@Body() post: UpdateScreen, @Request() req): Promise<any> {
    const { userId } = req
    try {
      const res = await this.screenService.publish(post, userId)
      return {
        message: '发布成功',
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * @description 大屏列表
   * @returns {Promise<string>}
   * @memberof ScreenController
   */
  @UseGuards(AuthStrategy)
  @Get('/getScreenList')
  @HttpCode(200)
  async getScreenList(@Query() query: any, @Request() req): Promise<any> {
    const { status } = query
    const { userId } = req
    try {
      const res = await this.screenService.getScreenList(status, userId)
      return {
        message: '请求成功',
        screenList: res.screenList,
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * @description 大屏列表
   * @returns {Promise<string>}
   * @memberof ScreenController
   */
  @UseGuards(AuthStrategy)
  @Get('/getScreenDetail')
  @HttpCode(200)
  async getScreenDetail(@Query() query: any): Promise<any> {
    const { id } = query
    try {
      const res = await this.screenService.getScreenDetail(id)
      return {
        message: '请求成功',
        ...res,
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Get('/getCommonScreenList')
  @HttpCode(200)
  async getCommonScreenList(@Query() query): Promise<any> {
    const { status } = query
    try {
      const res = await this.screenService.getCommonScreenList()
      return {
        screenList: res,
        count: res.length,
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  @UseGuards(AuthStrategy)
  @Get('/deleteScreenById')
  @HttpCode(200)
  async deleteScreenById(@Query() query: QueryId): Promise<any> {
    const { id } = query
    try {
      const res = await this.screenService.deleteScreenById(id)
      return {
        message: '删除成功',
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}

export default ScreenController
