import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getConnection, SelectQueryBuilder, Entity} from 'typeorm'
import { Form } from '@/entities/form'
import { User } from '@/entities/User'
import { AddForm } from '@/controllers/form/index.dto'

@Injectable()
export default class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<any>,

    @InjectRepository(User)
    private readonly userRepository: Repository<any>,

  ){
  }

  async add(formInfo: AddForm, userId: number){
    const queryRes = await this.getFormList(userId)
    if(queryRes.length >= 10){
      throw new InternalServerErrorException('普通会员最多添加10条')
    }

    const user = new User()
    user.userId = userId

    if(!formInfo.structure){
      formInfo.structure = []
    }

    const form = this.formRepository.create(formInfo)
    form.user = user
    const res = this.formRepository.save(form)
    return res
  }

  async getFormList(userId, status?: string){
    const res = status
    ? await this.formRepository.createQueryBuilder('form')
    .select()
    .where('form.creator = :userId', {userId: userId})
    .andWhere(`form.status = :status`, {status: status})
    .orderBy('form.updateTime', 'DESC')
    .getMany()

    : await this.formRepository.createQueryBuilder()
    .select('Form')
    .where('form.creator = :userId', {userId: userId})
    .orderBy('form.updateTime', 'DESC')
    .getMany()

    return res
  }


  async getFormById (id: string){
    const data = this.formRepository.findOneOrFail({
      where: {
        id,
      },
      // relations: ['children']
    });
    return data
  }

  async updateForm (formInfo, userId){
    const { id, ...rest } = formInfo


    const form = this.formRepository.merge(new Form(), rest)
    form.id=id

    const res = await this.formRepository.save(form)

    return res
  }

  async publishForm (formInfo) {

    const {id, ...rest} = formInfo

    rest.status = '1'

    const res = this.formRepository.update(id, rest)

    return res

  }

  async deleteFormById (id: string) {
    const data = await this.formRepository.delete(id);
    return data
  }

}
