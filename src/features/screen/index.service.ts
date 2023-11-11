import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Screen } from '@/entities/screen'
import {
  AddScreen,
  QueryId,
  UpdateScreen,
} from '@/controllers/screen/index.dto'
import { User } from '@/entities/User'
import { ScreenMaterial } from '@/entities/screenMaterial'
import { getManager } from 'typeorm'
import { whiteUserList } from '@/constants/whiteUser'

@Injectable()
export default class ScreenService {
  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<any>,

    @InjectRepository(User)
    private readonly userRepository: Repository<any>,

    @InjectRepository(ScreenMaterial)
    private readonly screenMaterialRepository: Repository<any>,
  ) {}

  async add(screen: AddScreen, userId: number) {
    const queryRes = await this.getScreenList(null, userId)
    if (queryRes.screenList.length >= 10 && !whiteUserList.includes(userId)) {
      throw new InternalServerErrorException('普通会员最多添加10条')
    }
    const user = new User()
    user.userId = userId

    const { id: _id, pageComs = [], ...rest } = screen
    const screenEnt = this.screenRepository.create(rest)
    screenEnt.user = user

    const screenMaterials = pageComs.map((item) => {
      const { sm_id: _sm, id, ...rest } = item
      rest.m_id = id || rest.m_id
      const sMaterial = this.screenMaterialRepository.create(rest)
      return sMaterial
    })

    screenEnt.pageComs = screenMaterials

    const res = await this.screenRepository.save(screenEnt)
    return res
  }

  async update(screen: UpdateScreen, userId: number) {
    const { pageComs = [], ...rest } = screen

    const oldPageComs = await this.screenMaterialRepository
      .createQueryBuilder('screenMaterial')
      .select(['screenMaterial.sm_id', 'screenMaterial.m_id'])
      .where('screenMaterial.screen_id = :id', { id: rest.id })
      .getMany()

    const user = new User()
    user.userId = userId

    const screenEnt = this.screenRepository.create(rest)
    screenEnt.user = user

    const screenMaterials = pageComs.map((item) => {
      const { sm_id: _sm, id, ...rest } = item
      rest.m_id = id || rest.m_id
      const sMaterial = this.screenMaterialRepository.create(rest)
      return sMaterial
    })

    screenEnt.pageComs = screenMaterials
    screenEnt.status = '0'

    const res = await this.screenRepository.save(screenEnt)
    try {
      oldPageComs.forEach((item) => {
        this.screenMaterialRepository.delete(item.sm_id)
      })

      return res
    } catch (err) {}
  }

  async publish(screen: UpdateScreen, userId: number) {
    const { pageComs = [], ...rest } = screen

    const oldPageComs = await this.screenMaterialRepository
      .createQueryBuilder('screenMaterial')
      .select(['screenMaterial.sm_id', 'screenMaterial.m_id'])
      .where('screenMaterial.screen_id = :id', { id: rest.id })
      .getMany()

    const user = new User()
    user.userId = userId

    const screenEnt = this.screenRepository.create(rest)
    screenEnt.user = user
    screenEnt.status = '1'

    const screenMaterials = pageComs.map((item) => {
      const { sm_id: _sm, id, ...rest } = item
      rest.m_id = id || rest.m_id
      const sMaterial = this.screenMaterialRepository.create(rest)
      return sMaterial
    })

    screenEnt.pageComs = screenMaterials

    const res = await this.screenRepository.save(screenEnt)
    try {
      oldPageComs.forEach((item) => {
        this.screenMaterialRepository.delete(item.sm_id)
      })

      return res
    } catch (err) {}
  }

  async getScreenList(status: string, userId: number) {
    const res = status
      ? await this.userRepository
          .createQueryBuilder('user')
          .select([])
          .where(`user.userId = :userId`, { userId: userId })
          .leftJoinAndSelect('user.screenList', 'screen')
          .where('screen.status = :status', { status: status })
          .orderBy('screen.updateTime', 'DESC')
          .getOne()
      : await this.userRepository
          .createQueryBuilder('user')
          .select(['user.userId'])
          .where(`user.userId = :userId`, { userId: userId })
          .leftJoinAndSelect('user.screenList', 'screen')
          .orderBy('screen.updateTime', 'DESC')
          .getOne()

    return res
  }

  async getScreenDetail(id: string) {
    const res = await this.screenRepository
      .createQueryBuilder('screen')
      .select()
      .where(`screen.id = :id`, { id: id })
      .leftJoinAndSelect('screen.pageComs', 'pageComs')
      .getOne()

    return res
  }

  async getCommonScreenList() {
    const status = '1'
    const res = await this.screenRepository
      .createQueryBuilder('screen')
      .select()
      .where(`screen.status = :status`, { status: status })
      .andWhere(`screen.isPublic = 1`)
      .orderBy('screen.updateTime', 'DESC')
      .getMany()

    // const data = await this.materialRepository.findAndCount();
    return res
  }

  async updateScreenBasic(comInfo, userId) {
    const { id, ...rest } = comInfo

    const screen = this.screenRepository.merge(new Screen(), rest)
    screen.id = id

    const res = await this.screenRepository.save(screen)

    return res
  }

  async deleteScreenById(id: string) {
    const screen = await this.getScreenDetail(id)
    const { pageComs = [] } = screen
    pageComs.map(async (item) => {
      const { sm_id } = item
      await this.screenMaterialRepository.delete(sm_id)
    })

    const data = await this.screenRepository.delete(id)
    return data
  }
}
