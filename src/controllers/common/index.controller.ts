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
  Headers,
  Request,
  Header,
} from '@nestjs/common'
import CommonService from '@/features/common/index.service'
import { GetCode } from '@/controllers/common/index.dto'
import { uRedis } from '@/utils'

@Controller('/common')
class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('/getData')
  getDataById() {
    return {
      data: [
        { item: '事例一', count: 40, percent: 0.4 },
        { item: '事例二', count: 21, percent: 0.21 },
        { item: '事例三', count: 17, percent: 0.17 },
        { item: '事例四', count: 13, percent: 0.13 },
        { item: '事例五', count: 9, percent: 0.09 },
      ],
    }
  }

  @Get('/getCode')
  @HttpCode(200)
  async add(
    @Request() request,
    @Headers() Headers,
    @Query() query: GetCode,
  ): Promise<any> {
    const { email } = query
    try {
      // 设置1小时只能发30次
      const emailInfo = await uRedis.getRedisSync(`${email}_info`)
      if (!emailInfo) {
        const newEmailInfo = {
          count: 1,
          time: new Date().getTime(),
        }
        await uRedis.setRedis(`${email}_info`, newEmailInfo, 60 * 60)
      } else {
        const { count, time } = emailInfo
        const curTime = new Date().getTime()
        if (count === 30 && curTime - time < 60 * 60 * 1000) {
          throw new InternalServerErrorException({
            message: '验证码发送频繁，请稍后再试',
          })
        } else {
          const newEmailInfo = {
            count: count + 1,
            time,
          }
          const restTime = Math.floor((curTime - time) / 1000)
          await uRedis.setRedis(`${email}_info`, newEmailInfo, restTime)
        }
      }
      const res = await this.commonService.sendCode(email)
      await uRedis.setRedis(email, res.code, 60)
      return {
        message: '已发送',
        code: res.code,
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}

export default CommonController
