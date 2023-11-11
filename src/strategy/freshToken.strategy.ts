import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { uRedis } from '@/utils'

@Injectable()
export class FreshTokenStrategy implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const headers = request.headers
    const tokenKey = headers['x-pg-token']
    const cacheToken = await uRedis.getRedisSync(tokenKey)

    if (cacheToken) {
      await uRedis.setRedis(cacheToken, cacheToken, 60 * 60 * 24) // 刷新时间
    }

    return true
  }
}
