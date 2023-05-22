
import { IsNotEmpty, Matches, IsString, IsObject, IsNumber, IsEnum } from 'class-validator'
import { Type } from 'class-transformer';


// import { Type } from 'class-transformer';
// import { IsNumber, IsString, ValidateNested } from 'class-validator';

// class Address {
//   @IsString()
//   addressName: string;

//   @IsNumber()
//   addressCode: number;
// }

// class User {
//   @IsString()
//   userName: string;

//   @ValidateNested()
//   @Type(() => Address)
//   address: Address;
// }

enum OriginEnum {
  '本地'='0',
  '远程'='1'
}

class DataValues {
  @IsEnum(OriginEnum)
  isOrigin: OriginEnum;
}

export class AddMaterial {

  m_id?: string;

  sm_id?: string;

  id?: string;

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
    message: '类别不能为空',
  })
  @IsString()
  type: string

  panel?: DyObj

  code?: DyObj

  @Type(() => DataValues)
  dataValues?: DataValues

  // @IsNotEmpty({
  //   message: '代码不能为空',
  // })
  // @IsObject({
  //   message: 'code是对象'
  // })
  // code: {
  //   js: string,
  //   css: string,
  // }
}

export class QueryId {
  @IsNotEmpty({
    message: 'id不能为空'
  })
  @IsString()
  id: string
}

export class PublishMaterial {

  @IsNotEmpty({
    message: '组件id不能为空'
  })
  @IsString()
  id: string

  @IsNotEmpty({
    message: '代码不能为空',
  })
  @IsObject({
    message: 'code是对象'
  })
  code: {
    js: string,
    css: string,
  }

  panel: DyObj

  @Type(() => DataValues)
  dataValues: DataValues
}
