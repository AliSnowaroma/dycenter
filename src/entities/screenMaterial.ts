import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Screen } from './screen'

interface CommonConfig {
  values: DyObj
  formItems: Array<any>
}

export const defaultPanel = {
  infoConfig: {
    values: {},
    formItems: [],
  },
  dataConfig: {
    values: {},
  },
  eventConfig: {
    values: {},
    formItems: [],
  },
}

enum MaterialTypes {
  '基础组件' = '0',
  '图表组件' = '1',
  '地图组件' = '2',
  '定制组件' = '3',
}

@Entity()
export class ScreenMaterial {
  // 大屏组件id
  @PrimaryGeneratedColumn('uuid')
  sm_id: string

  // 物料id
  @Column({ default: null })
  m_id: string

  @UpdateDateColumn({ select: false })
  updateTime: Date

  @CreateDateColumn({ select: false })
  createTime: Date

  @Column({ default: null })
  name: string

  @Column({ default: null })
  width: number

  @Column({ default: null })
  height: number

  @Column({ default: 0 })
  x: number

  @Column({ default: 0 })
  y: number

  @Column({ default: false })
  isLocalComponent: boolean

  @Column({ default: null })
  localComponentName: string

  @Column({ default: null })
  thumbnail: string

  @Column('enum', { enum: MaterialTypes, default: MaterialTypes['0'] })
  type: string

  @ManyToOne(() => Screen, (screen) => screen.pageComs, {
    // cascade: true
  })
  @JoinColumn({ name: 'screen_id' })
  screen: Screen

  @Column('simple-json')
  dataValues: {
    isOrigin: string
    data: string
    url: string
    method: string
    freshTime: number
    params: string
  }

  @Column('simple-json') // 严格模式下json列无法设置默认值
  code: {
    js: string
    css: string
  }

  @Column('simple-json')
  panel?: {
    infoConfig: CommonConfig
    eventConfig: CommonConfig
  }
}
