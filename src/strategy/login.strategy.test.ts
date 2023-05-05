import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { compareSync, hashSync } from 'bcryptjs';
import { Repository } from 'typeorm'
import { User } from '@/entities/User';
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class LoginStrategy implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { username, password } = request.body
    const hashPassword = await hashSync(password)

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
          return true
        } else {
          throw new InternalServerErrorException('用户名不正确！');
        }
      }
      throw new InternalServerErrorException('用户名不正确！');
    }

    if (!compareSync(hashSync(hashPassword), user.password)) {
      throw new InternalServerErrorException('密码错误！');
    }

    return true
  }
}
