import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import 'reflect-metadata'
import { ValidationError } from 'class-validator'
import { uLogger } from '@/utils'

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch (exception: HttpException| any, host: ArgumentsHost): void {
    let error: IDataResponse
    const ctx: any = host.switchToHttp()
    const response: any = ctx.getResponse()
    const status: number = exception.getStatus()

    //  exception.getResponse() 和 new InternalServerErrorException(param)的关系
    // error信息为字符串 { statusCode: 500, message: '错误信息', error: 'Internal Server Error' }
    // 传入对象，包含status { status: '206', message: '错误' }，传入的对象会覆盖Error对象

    const { status: highStatus } = exception.getResponse() || {}
    const defaultStatus = highStatus || status

    if (defaultStatus === HttpStatus.BAD_REQUEST) {
      const exceptionResponse: any = exception.getResponse();
      let validMessage = '';

      if (typeof exceptionResponse === 'object') {
        validMessage =
          typeof exceptionResponse.message === 'string'
            ? exceptionResponse.message
            : exceptionResponse.message[0];
      }
      error = {
        success: false,
        code: `${defaultStatus}`,
        msg: validMessage,
      }

      uLogger.logger.error({
        code: error.code,
        msg: error.msg,
      })
    } else {
      if (exception.message.msg && exception.message.code) {
        uLogger.logger.error(exception.message)
        error = {
          success: false,
          code: exception.message.code,
          msg: exception.message.msg,
        }
      } else {
        const message = exception.message
        ? exception.message
        : `${defaultStatus >= 500 ? 'Service Error' : 'Client Error'}`;

        uLogger.logger.error({
          code: `${defaultStatus}`,
          msg: message,
        })
        error = {
          success: false,
          code: `${defaultStatus}`,
          msg: message,
        }
      }
    }
    response.status(defaultStatus).json(error)
  }
}
