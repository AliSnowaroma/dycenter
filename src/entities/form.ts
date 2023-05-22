import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, OneToOne, UpdateDateColumn, CreateDateColumn, OneToMany, JoinColumn  } from 'typeorm'
import { User } from './User'

interface FormItemStructure {
  marktype: string,
  param: string,
  label: string,
  [key: string]: any
}


enum FormTypes {
  '搜索表单' = "0",
  '详情表单' = "1",
  '弹窗表单'= "2",
  '面板表单'= "3",
  '定制表单'= "4"
}

enum FormStatus {
  '编辑中' = "0",
  '已发布' = "1",
  '审核中' = "2",
  '已删除'= "3",
}

enum RoleLevel {
  '普通会员' = "0",
  '银卡会员' = "1",
  '金卡会员' = "2",
  '尊享会员'= "3",
}

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({select: false})
  updateTime: Date

  @CreateDateColumn({select: false})
  createTime: Date

  @Column({default: ''})
  name: string;

  @Column({default: false})
  isLocalComponent: boolean;

  @Column({default: null})
  localComponentPath: string;


  @Column({default: null})
  brief: string;

  @Column('enum', { enum: FormTypes, default: FormTypes['0'] })
  type: string;

  @Column('enum', { enum: FormStatus, default: FormStatus['0'] })
  status: string;

  @Column('enum', { enum: RoleLevel, default: RoleLevel['0'] })
  roleLevel: string;

  @ManyToOne(type => User, user => user.formList, {
    nullable: true
  })
  @JoinColumn({name: 'creator'})
  user: User;

  @Column({default: null})
  creator: string

  @Column("simple-json")
  structure: FormItemStructure[]
}
