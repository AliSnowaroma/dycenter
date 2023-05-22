import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn,UpdateDateColumn } from 'typeorm'
import { ScreenMaterial } from './screenMaterial'
import {User} from './User'

enum AutoFitTypes {
  '否' = "0",
  '是' = "1",
}


enum ScreenStatus {
  '编辑中' = "0",
  '已发布' = "1",
  '已删除'= "2",
}

enum RoleLevel {
  '普通会员' = "0",
  '银卡会员' = "1",
  '金卡会员' = "2",
  '尊享会员'= "3",
}

@Entity()
export class Screen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({select: false})
  updateTime: Date

  @CreateDateColumn({select: false})
  createTime: Date

  @Column('enum', { enum: ScreenStatus, default: ScreenStatus['0'] })
  status: string;

  @Column('enum', { enum: RoleLevel, default: RoleLevel['0'] })
  roleLevel: string;

  @Column({default: null})
  name: string;

  @Column({default: 1920})
  width: number;

  @Column({default: 1080})
  height: 1080;

  @Column({default: null})
  thumb: string;

  @Column({default: null})
  brief: string;

  @Column({default: false})
  isPublic: boolean;

  @Column('enum', { enum: AutoFitTypes, default: AutoFitTypes['0'] })
  autoFit: string;

  @Column({default: null})
  fitMinWidth: number;

  @OneToMany(type => ScreenMaterial, screenMaterial => screenMaterial.screen, {
    cascade: true
  })
  pageComs: ScreenMaterial[];

  @ManyToOne(type => User, user => user.screenList)
  @JoinColumn({name: 'userId'})
  user: User
}
