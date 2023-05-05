import {
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compareSync, hashSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Repository } from 'typeorm'
import { User } from '@/entities/User';

/**
 * 第一个参数: Strategy，你要用的策略，这里是passport-local
 * 第二个参数:是策略别名，上面是passport-local,默认就是local
 * 弊端： 该方法不能定义status, 总是返回401
 */
export class LoginStragegy extends PassportStrategy(Strategy, 'login') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {

    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {

    const hashPassword = password

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();

    if (!user) {
      const isEmail = /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(username)    // 判断username是不是邮箱
      if(isEmail){
        const emailUser = await this.userRepository.findOne({
          where:{
            email: username
          }
        })

        if(emailUser && compareSync(hashPassword, emailUser.password)){
          return emailUser
        } else {
          throw new InternalServerErrorException('用户名不正确！');
        }
      }
      throw new InternalServerErrorException('用户名不正确！');
    }

    if (!compareSync(hashPassword, user.password)) {
      throw new InternalServerErrorException('密码错误！');
    }

    return user;
  }
}
