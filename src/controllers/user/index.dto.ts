
import { IsNotEmpty, Matches, IsString } from 'class-validator'

// @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, {
//   message: '至少8-16个字符，至少1个大写字母，1个小写字母和1个数字',
// })

export class DRegisterUser {
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @Matches(/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, {
    message: '请输入有效的邮箱',
  })
  @IsString()
  email: string

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @IsString()
  password: string

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  @IsString()
  code: string

  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @IsString()
  username: string
}

export class DUpdatePassword {
  // @IsNotEmpty({
  //   message: '密码不能为空',
  // })
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, {
  //   message: '至少8-16个字符，至少1个大写字母，1个小写字母和1个数字',
  // })
  // @IsString()
  // password: string

  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @Matches(/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, {
    message: '请输入有效的邮箱',
  })
  @IsString()
  email: string

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @IsString()
  password: string

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  @IsString()
  code: string
}

export class EmailLogin {
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @Matches(/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, {
    message: '请输入有效的邮箱',
  })
  @IsString()
  email: string

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  @IsString()
  code: string
}
