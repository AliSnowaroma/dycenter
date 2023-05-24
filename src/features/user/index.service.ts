import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@/entities/User'
import { hashSync } from 'bcryptjs'
import CommonService from '@/features/common/index.service'


@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<any>,
    private readonly commonService: CommonService
  ){}
  /**
   * @description 注册账号
   * @param {T} user
   * @returns {Promise<IResUser>}
   * @memberof UserService
   */
  async register (user: RegisterSave): Promise<any> {
    const password = await hashSync(user.password, 10)
    const res = this.userRepository.insert({
      ...user,
      password
    })
    return res
  }

   /**
   * @description 查询user, email是否存在
   * @param {QueryUser} user
   * @returns {Promise<any>}
   * @memberof UserService
   */
  async getUserByUsernameOrEmail (user: QueryUser): Promise<any> {
    const { email, username } = user
    let queryCondition:QueryUser = {}

    if(email){
      queryCondition.email=email

    } else {
      queryCondition.username=username
    }
    const res = await this.userRepository.findOne({
      where:queryCondition
    })

    if(!res){
      return res
    } else {
      const error = email ? '邮箱已存在' : '用户名已存在'
      throw new InternalServerErrorException(error);
    }


  }

  /**
   * @description 修改密码
   * @param email, password
   * @returns {Promise<IResUser>}
   * @memberof UserService
   */
  async resetPassword ({email, password}): Promise<any> {
    const res = await this.userRepository.findOne({
      where:{
        email
      }
    })

    if(res){
      const hashPassword = await hashSync(password, 10)
      const upRes = await this.userRepository.update({email},{
        password: hashPassword
      })
      return upRes
    } else {
      throw new InternalServerErrorException('邮箱未注册');
    }
  }

  /**
   * @description 根据id获取用户信息
   * @param {ISaveUser} user
   * @returns {Promise<IResUser>}
   * @memberof UserService
   */
  async getUserById (useId: number): Promise<any> {
    const res = await this.userRepository.findOneBy({
      useId
    })
    return res
  }

  /**
   * @description:
   * @param {number} id
   * @return {*}
   * @memberof: UserService
   */
  async loginByEmail (email: string): Promise<any> {
    const emailUser = await this.userRepository.findOne({
      where:{
        email
      }
    })

    if(emailUser){
      const {password:_p, ...rest} = emailUser
      return rest
    }
    const password = await this.commonService.sendPassword(email)
    const res = await this.register({
      username:email,
      password:password,
      email,
    })

    return res.generatedMaps[0]
  }
}
