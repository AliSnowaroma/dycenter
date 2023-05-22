
import { IsNotEmpty, Matches, IsString, IsObject, IsNumber, IsEnum } from 'class-validator'
import { Type } from 'class-transformer';
import { AddMaterial } from '@/controllers/material/index.dto'


export class AddScreen {
  id?: string

  @IsNotEmpty({
    message: '名称不能为空',
  })
  @IsString()
  name: string

  @IsNotEmpty({
    message: '高度不能为空',
  })
  @IsNumber()
  height: number

  @IsNotEmpty({
    message: '宽度不能为空',
  })
  @IsNumber()
  width: number

  thumb?: any;

  @IsNotEmpty({
    message: '是否自适应不能为空',
  })
  @IsString()
  autoFit: string;

  fitMinWidth?: number;

  @Type(() => AddMaterial)
  pageComs?: AddMaterial[]
}

export class QueryId {
  @IsNotEmpty({
    message: 'id不能为空'
  })
  @IsString()
  id: string
}


export class UpdateScreen {
  @IsNotEmpty({
    message: '名称不能为空',
  })
  @IsString()
  id: string

  @IsNotEmpty({
    message: '名称不能为空',
  })
  @IsString()
  name: string

  @IsNotEmpty({
    message: '高度不能为空',
  })
  @IsNumber()
  height: number

  @IsNotEmpty({
    message: '宽度不能为空',
  })
  @IsNumber()
  width: number

  @IsNotEmpty({
    message: '是否自适应不能为空',
  })
  @IsString()
  autoFit: string;

  fitMinWidth?: number;

  @Type(() => AddMaterial)
  pageComs?: AddMaterial[]
}
