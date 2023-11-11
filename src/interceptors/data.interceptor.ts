import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class DataInterceptor implements NestInterceptor {
  intercept(_: any, next: CallHandler): Observable<IDataResponse> {
    return next.handle().pipe(
      map((data: any) => {
        const { message = '请求成功', success, ...rest } = data || {}
        const successResponse: IDataResponse = {
          success: success !== undefined ? success : true,
          data: rest,
          message: message,
        }

        return successResponse
      }),
    )
  }
}
