import { Module } from '@nestjs/common'
import UserModule from '@/controllers/user/index.module'
import MaterialModule from '@/controllers/material/index.module'
import CommonModule from '@/controllers/common/index.module'
import ScreenModule from '@/controllers/screen/index.module'
import FormModule from '@/controllers/form/index.module'

@Module({
  imports: [UserModule, MaterialModule, CommonModule, ScreenModule, FormModule],
  exports: [UserModule, MaterialModule, CommonModule, ScreenModule, FormModule],
})
export default class FeatureModule {}
