import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Screen } from '@/entities/screen'
import { AddScreen, QueryId } from '@/controllers/screen/index.dto'
import { User } from '@/entities/User'
import { ScreenMaterial } from '@/entities/screenMaterial'
import { getManager } from "typeorm";

@Injectable()
export default class ScreenService {
  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<any>,

    @InjectRepository(User)
    private readonly userRepository: Repository<any>,

    @InjectRepository(ScreenMaterial)
    private readonly screenMaterialRepository: Repository<any>,
  ){}

  async add(screen: AddScreen, userId: number){
    const user = new User()
    user.userId = userId

    const screenEnt = this.screenRepository.create(screen)
    screenEnt.user = user

    const res = await this.screenRepository.save(screenEnt)
    return res
  }

  async update(screen: AddScreen, userId: number){
    const { pageComs, ...rest} = screen

    const oldPageComs = await this.screenMaterialRepository.createQueryBuilder('screenMaterial')
    .select(['screenMaterial.sm_id', 'screenMaterial.m_id'])
    .where('screenMaterial.screen_id = :id', {id: rest.id})
    .getMany()

    console.log(oldPageComs)

    const user = new User()
    user.userId = userId

    const screenEnt = this.screenRepository.create(rest)
    screenEnt.user = user

    const screenMaterials = pageComs.map(item => {
      const sMaterial = this.screenMaterialRepository.create(item)
      return sMaterial
    })

    screenEnt.pageComs = screenMaterials

    const res = await this.screenRepository.save(screenEnt)
    try {
      oldPageComs.forEach(item => {
        this.screenMaterialRepository.delete(item.sm_id)
      })

      return res
    } catch(err){

    }
  }

  async publish(screen: AddScreen, userId: number){
    const { pageComs, ...rest} = screen

    const oldPageComs = await this.screenMaterialRepository.createQueryBuilder('screenMaterial')
    .select(['screenMaterial.sm_id', 'screenMaterial.m_id'])
    .where('screenMaterial.screen_id = :id', {id: rest.id})
    .getMany()

    const user = new User()
    user.userId = userId

    const screenEnt = this.screenRepository.create(rest)
    screenEnt.user = user
    screenEnt.status = '1'

    const screenMaterials = pageComs.map(item => {
      const sMaterial = this.screenMaterialRepository.create(item)
      return sMaterial
    })

    screenEnt.pageComs = screenMaterials

    const res = await this.screenRepository.save(screenEnt)
    try {
      oldPageComs.forEach(item => {
        this.screenMaterialRepository.delete(item.sm_id)
      })

      return res
    } catch(err){

    }
  }

  async getScreenList (status:string, userId: number) {
    const res = status
    ? await this.userRepository.createQueryBuilder('user')
    .select([])
    .where(`user.userId = :userId`, {userId: userId})
    .leftJoinAndSelect('user.screenList', 'screen')
    .where('screen.status = :status', {status:status})
    .getOne()

    : await this.userRepository.createQueryBuilder('user')
    .select(['user.userId'])
    .where(`user.userId = :userId`, {userId: userId})
    .leftJoinAndSelect('user.screenList', 'screen')
    .orderBy('screen.updateTime')
    .getOne()

    return res
  }

  async getScreenDetail (id: string) {
    const res = await this.screenRepository.createQueryBuilder('screen')
    .select()
    .where(`screen.id = :id`, {id: id})
    .leftJoinAndSelect('screen.pageComs', 'pageComs')
    .getOne()

    return res
  }


}
