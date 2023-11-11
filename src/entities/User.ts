import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm'
import { Screen } from '@/entities/screen'
import { Material } from '@/entities/Material'
import { Form } from '@/entities/form'

enum UserRoles {
  '普通会员' = '0',
  '银卡会员' = '1',
  '金卡会员' = '2',
  '尊享会员' = '3',
  '商务定制' = '4',
  '管理员' = '5',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @Column({ default: null })
  username: string

  @Column()
  password: string

  @Column('enum', { enum: UserRoles, default: UserRoles['0'] })
  role: number

  @Column({ default: null })
  tel: number

  @Column({ default: null })
  wechat: string

  @Column({ default: null })
  email: string

  @OneToMany((type) => Screen, (screen) => screen.user)
  screenList: Screen[]

  @OneToMany((type) => Material, (material) => material.creator)
  materials: Material[]

  @OneToMany((type) => Form, (form) => form.creator)
  formList: Form[]

  // @BeforeInsert() // 不生效， 实例方法问题
  // async encryptPwd() {
  //   this.password = await bcrypt.hashSync(this.password);
  // }
}
