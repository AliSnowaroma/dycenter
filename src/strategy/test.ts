import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoginStrategy implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest()

        throw new InternalServerErrorException('错误')
        // return true;
        // 模拟做权限判断
        var n = Math.random();
        console.log('n: ', n);
        if(n>0.5){
            return true;
        }
        return false;
    }
}
