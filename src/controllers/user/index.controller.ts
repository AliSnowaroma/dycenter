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
import UserService from '@/features/user/index.service'
import {
  DRegisterUser,
  EmailLogin,
  DUpdatePassword,
} from '@/controllers/user/index.dto'
import { uRedis, createToken } from '@/utils'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { AuthStrategy } from '@/strategy/auth.strategy.redis'
import { TOKEN } from '@/constants'

@Controller('/user')
class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description 注册
   * @returns {Promise<string>}
   * @memberof UserController
   */
  @Post('/register')
  @HttpCode(200)
  async register(@Body() post: DRegisterUser): Promise<any> {
    const { email, code, password, username } = post
    await this.userService.getUserByUsernameOrEmail({ username })
    // await this.userService.getUserByUsernameOrEmail({email})
    const cacheCode = await uRedis.getRedisSync(`${email}`)
    if (code === cacheCode) {
      await uRedis.delRedis(email)
      try {
        const res = await this.userService.register({
          email,
          password,
          username,
        })
        return {
          message: '注册成功',
        }
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    } else {
      await uRedis.delRedis(email)
      throw new InternalServerErrorException({
        message: '验证码错误',
      })
    }
  }

  /**
   * @description 邮箱登录
   * @returns {Promise<string>}
   * @memberof UserController
   */
  @Post('/loginByEmail')
  @HttpCode(200)
  async loginByEmail(@Body() post: EmailLogin, @Request() req): Promise<any> {
    const { email, code } = post
    const cacheCode = await uRedis.getRedisSync(`${email}`)
    if (code === cacheCode) {
      await uRedis.delRedis(email)
      try {
        const res = await this.userService.loginByEmail(email)
        const payload = {
          sub: res.userId,
        }
        // const access_token = this.jwtService.sign(payload)
        const token = createToken(payload, TOKEN.sceret, TOKEN.iv)
        const oldToken = req.headers['x-pg-token']
        await uRedis.setRedis(token, token, 60 * 60 * 24)
        await uRedis.delRedis(oldToken)
        return {
          message: '登录成功',
          ...res,
          token: token,
        }
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    } else {
      return {
        success: false,
        message: '验证码错误',
      }
    }
  }

  @UseGuards(AuthGuard('login'))
  @Post('/login')
  @HttpCode(200)
  async login(@Request() req): Promise<any> {
    const { password: _pass, username, userId, ...rest } = req.user
    const payload = {
      sub: userId,
    }
    try {
      const token = createToken(payload, TOKEN.sceret, TOKEN.iv)
      const oldToken = req.headers['x-pg-token']
      await uRedis.setRedis(token, token, 60 * 60 * 24)
      await uRedis.delRedis(oldToken)

      return {
        token,
        ...rest,
        username,
        userId,
      }
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  @Post('/logout')
  @HttpCode(200)
  async logout(@Request() req): Promise<any> {
    const oldToken = req.headers['x-pg-token']

    try {
      await uRedis.delRedis(oldToken)
      return {
        message: '已退出登录',
      }
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  /**
   * @description 修改密码
   * @returns {Promise<string>}
   * @memberof UserController
   */
  @Post('/resetPassword')
  @HttpCode(200)
  async resetPassword(@Body() post: DUpdatePassword): Promise<any> {
    const { email, code, password } = post
    const cacheCode = await uRedis.getRedisSync(`${email}`)
    if (code === cacheCode) {
      await uRedis.delRedis(email)
      try {
        await this.userService.resetPassword({ email, password })
        return {
          message: '密码已重置',
        }
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    } else {
      await uRedis.delRedis(email)
      throw new InternalServerErrorException({
        message: '验证码错误',
      })
    }
  }

  /**
   * 判断登录状态
   */
  @UseGuards(AuthStrategy)
  @Get('getLoginStatus')
  @HttpCode(200)
  async getLoginStatus(): Promise<any> {
    try {
      return {
        status: true,
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   *
   */
  @Get('/1.0/getUserById')
  @HttpCode(200)
  async getUserById(@Query() query): Promise<any> {
    const { useId } = query
    try {
      const res = this.userService.getUserById(useId)
      return res
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}

export default UserController
