import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Generated, JoinColumn } from 'typeorm'
import { ScreenMaterial } from './screenMaterial'

enum AutoFitTypes {
  '否' = "0",
  '是' = "1",
}

@Entity()
export class Screen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: null})
  name: string;

  @Column({default: 1920})
  width: number;

  @Column({default: 1080})
  height: 1080;

  @Column({default: null})
  thumb: string;

  @Column('enum', { enum: AutoFitTypes, default: AutoFitTypes['0'] })
  autoFit: string;

  @Column({default: null})
  fitMinWidth: number;

  @OneToMany(type => ScreenMaterial, screenMaterial => screenMaterial.screen)
  pageComs: ScreenMaterial[];

}
