
import { IsNotEmpty, Matches, IsString, IsObject, IsNumber, IsEnum } from 'class-validator'
import { Type } from 'class-transformer';

export class GetCode {
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @Matches(/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, {
    message: '请输入有效的邮箱',
  })
  @IsString()
  email: string
}
