import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, OneToOne, UpdateDateColumn, CreateDateColumn, OneToMany, JoinColumn  } from 'typeorm'
import { User } from './User'

interface CommonConfig {
  values: DyObj,
  formItems: Array<any>
}


export const defaultPanel = {
  infoConfig: {
    values: {},
    formItems: []
  },
  dataConfig: {
    values: {},
  },
  eventConfig: {
    values: {},
    formItems: []
  }
}


enum MaterialTypes {
  '基础组件' = "0",
  '图表组件' = "1",
  '地图组件'= "2",
  '定制组件'= "3"
}

enum MaterialStatus {
  '编辑中' = "0",
  '已发布' = "1",
  '已删除'= "2",
}

@Entity()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn()
  updateTime: Date

  @CreateDateColumn()
  createTime: Date

  @Column({default: null})
  name: string;

  @Column({default: null})
  width: number;

  @Column({default: null})
  height: number;

  @Column({default: false})
  isLocalComponent: boolean;

  @Column({default: null})
  localComponentName: string;

  @Column({default: false})
  public: boolean;

  @Column({default: null})
  thumbnail: string;

  @Column('enum', { enum: MaterialTypes, default: MaterialTypes['0'] })
  type: string;

  @Column('enum', { enum: MaterialStatus, default: MaterialStatus['0'] })
  status: string;

  @ManyToOne(type => User, user => user.materials, {
    nullable: true
  })
  @JoinColumn({name: 'creator'})
  user: User;

  @Column({default: null})
  creator: string

  @Column("simple-json")
  dataValues: {
    isOrigin: string;
    data: string;
    url: string;
    method: string;
    freshTime: number;
    params: string;
  }

  @Column("simple-json") // 严格模式下json列无法设置默认值
  code: {
    js: string;
    css: string;
  }

  @Column("simple-json")
  panel?: {
    infoConfig: CommonConfig,
    eventConfig: CommonConfig
  }
}
