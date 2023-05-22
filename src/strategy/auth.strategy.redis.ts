import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Request
} from '@nestjs/common';
import { Repository } from 'typeorm'
import { User } from '@/entities/User';
import { InjectRepository } from '@nestjs/typeorm'
import * as jwt from 'jsonwebtoken'
import { TOKEN } from '@/constants'
import { parseToken, uRedis } from '@/utils'

@Injectable()
export class AuthStrategy implements CanActivate {
  constructor(){}

  private whiteUrlList: string[] = ['/api/user/loginByEmail', '/api/user/login'];

  private isWhiteUrl(urlList: string[], url: string): boolean {
    if (urlList.includes(url)) {
      return true;
    }
    return false;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest()

    //console.log('request', request.headers);
    // console.log('request', request.params);
    // console.log('request', request.query);
    // console.log('request', request.url);

    if(request.url.indexOf('/api/material/getMaterialById') > -1 && request.query.id==="bf798538-9d07-473e-b5c7-dd82d09f2c1d" ){
      return true
    }

    if (this.isWhiteUrl(this.whiteUrlList, request.url)) {
      return true;
    } else {
      const headers = request.headers
      const tokenKey = headers['x-pg-token']
      const cacheToken = await uRedis.getRedisSync(tokenKey)

      if(!cacheToken){
        throw new InternalServerErrorException({
          status: 401,
          message: '登录失效'
        })
        // return false
      }

      await uRedis.setRedis(cacheToken, cacheToken, 60*60*24) // 刷新时间

      return true

      // const data = jwt.verify(token, JWT.secret);
      // console.log(data)
      // return true;
    }
    return true
  }

}
