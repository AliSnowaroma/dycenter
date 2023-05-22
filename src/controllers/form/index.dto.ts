
import { IsNotEmpty, Matches, IsString, IsObject, IsNumber, IsEnum, IsArray } from 'class-validator'
import { Type } from 'class-transformer';

export class AddForm {

  id?: string;

  @IsNotEmpty({
    message: '名称不能为空',
  })
  @IsString()
  name: string

  @IsNotEmpty({
    message: '类别不能为空',
  })
  @IsString()
  type: string

  structure?: any

}

export class UpdateForm {
  @IsNotEmpty({
    message: '名称不能为空',
  })
  @IsString()
  id: string

  structure?: any
}

export class QueryId {
  @IsNotEmpty({
    message: 'id不能为空'
  })
  @IsString()
  id: string
}
