import { Module } from '@nestjs/common'
import UserModule from '@/controllers/user/index.module'
import MaterialModule from '@/controllers/material/index.module'
import CommonModule from '@/controllers/common/index.module'
import ScreenModule from '@/controllers/screen/index.module'

@Module({
  imports: [
    UserModule,
    MaterialModule,
    CommonModule,
    ScreenModule
  ],
  exports: [
    UserModule,
    MaterialModule,
    CommonModule,
    ScreenModule
  ]
})
export default class FeatureModule{}
