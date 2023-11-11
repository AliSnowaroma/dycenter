/**
 * 特定版本号物料表vmaterial
 * material 和 vmaterial表是一对多的关系
 * material 通过id, version关联vmaterial
 * vmaterial 通过id 关联 material
 *
 */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm'
// import { Material } from './Material'
// import { User } from './User'

interface CommonConfig {
  values: DyObj
  formItems: Array<any>
}

interface DataConfig {
  values: DyObj
}

const defaultCode = {
  js: '',
  css: '',
}

enum IsOriginEnum {
  '本地',
  '远程',
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

@Entity()
class Code {
  @Column({ default: null })
  js: string

  @Column({ default: null })
  css: string
}

enum MaterialTypes {
  '基础组件' = '0',
  '图表组件' = '1',
  '地图组件' = '2',
  '定制组件' = '3',
}

@Entity()
export class PublishMaterial {
  @PrimaryColumn()
  joint_id: string

  @UpdateDateColumn()
  updateTime: Date

  @CreateDateColumn()
  createTime: Date

  //版本号
  @Column({ default: null })
  version: string

  // @ManyToOne(type => User, user => user.vMaterials)
  // @JoinColumn({
  //   name: 'creator'
  // })
  // creator: User;

  // 后续可以在这里增加版本控制
  // @OneToMany(type => PVMaterial, pVMaterial => pVMaterial.pml)
  // children: PVMaterial[];

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

  // @ManyToOne(type => Material, material => material.children)
  // // @JoinColumn([
  // //   { name: 'Field1', referencedColumnName: 'field1' },
  // //   { name: 'Field2', referencedColumnName: 'field2' },
  // //   { name: 'Field3', referencedColumnName: 'field3' },
  // // ])
  // @PrimaryColumn()
  // material: Material;
}
