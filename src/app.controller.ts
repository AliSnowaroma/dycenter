import { Controller, Get, UseGuards, Res, InternalServerErrorException} from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path'
import * as fs from 'fs'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/mapdata.json')
  async getMapData() {
    try{
      const url = join(__dirname, '../../../assets/mapdata.json')
      const res = fs.readFileSync(url, 'utf8')
      return {
        ...JSON.parse(res)
      }
    } catch(err) {
      console.log(err)
      throw new InternalServerErrorException(err)
    }
  }

  @Get('/china.json')
  async getChinaData() {
    try{
      const url = join(__dirname, '../../../assets/china.json')
      const res = fs.readFileSync(url, 'utf8')
      return {
        ...JSON.parse(res)
      }
    } catch(err) {
      console.log(err)
      throw new InternalServerErrorException(err)
    }
  }
}
