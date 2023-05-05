import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm'
import bcrypt from 'bcryptjs'
import { Screen } from '@/entities/screen'
import { Material } from '@/entities/Material'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({default: null})
  username: string;

  @Column()
  password: string;

  @Column({default: 0})
  type: number;

  @Column({default: null})
  tel: number;

  @Column({default: null})
  wechat: string;

  @Column({default: null})
  email: string;

  @OneToMany(type => Screen, screen => screen.user)
  screenList: Screen[]

  @OneToMany(type => Material, material => material.creator)
  materials: Material[]


  // @BeforeInsert() // 不生效， 实例方法问题
  // async encryptPwd() {
  //   this.password = await bcrypt.hashSync(this.password);
  // }
}

