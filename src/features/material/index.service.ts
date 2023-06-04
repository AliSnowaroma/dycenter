import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getConnection, SelectQueryBuilder, Entity} from 'typeorm'
import { Material } from '@/entities/Material'
import { User } from '@/entities/User'
import { AddMaterial } from '@/controllers/material/index.dto'
import { whiteUserList } from '@/constants/whiteUser'
import { format } from 'path'

@Injectable()
export default class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<any>,

    @InjectRepository(User)
    private readonly userRepository: Repository<any>,

  ){
  }

  async add(comInfo: AddMaterial, userId: number){
    const queryRes = await this.getMaterialList(userId)
    if(queryRes.length >= 10 && !whiteUserList.includes(userId)){
      throw new InternalServerErrorException('普通会员最多添加10条')
    }
    let { panel, code, dataValues, ...rest } = comInfo
    const data = {
      ...rest,
      dataValues: {
        isOrigin: '0'
      },
      code: code ? code : {
        js: `import React from 'react'\n// import { Button } from 'antd' //使用antd时引入\n// import { Chart, Interval, Tooltip, getTheme } from 'bizcharts'; // 使用bizcharts时引入\nimport './index.scss'\n\n/**\n * @param props \n * data 组件数据\n * width height 组件宽高\n * infoValues 动态配置json\n */\nexport default function App(props) {\n  const { data, width, height, infoValues } = props\n  return (\n    <div>\n      jsx模板\n    </div>\n  )\n}\n`,
        css: `/**\n* 支持scss\n* 样式文件已进行沙箱隔离\n*/`
      },
      panel: panel ? panel : {
        infoConfig: {
          values: {},
          formItems: []
        },
        eventConfig: {
          values: {},
          formItems: []
        }
      }
    }
    const user = new User()
    user.userId = userId

    const material = this.materialRepository.create(data)
    material.user = user
    const res = this.materialRepository.insert(material)
    return res
  }

  async getMaterialList(userId, status?: string){
    const res = status
    ? await this.materialRepository.createQueryBuilder('material')
    .select()
    .where('material.creator = :userId', {userId: userId})
    .andWhere(`material.status = :status`, {status: status})
    .orderBy('material.updateTime', 'DESC')
    .getMany()

    : await this.materialRepository.createQueryBuilder('material')
    .select()
    .where('material.creator = :userId', {userId: userId})
    .orderBy('material.updateTime', 'DESC')
    .getMany()

    // const data = await this.materialRepository.findAndCount();
    return res
  }


  async getCommonMaterialList(){
    const status = "1";
    const res = await this.materialRepository.createQueryBuilder('material')
    .select()
    .where(`material.status = :status`, {status: status})
    .andWhere(`material.isPublic = 1`)
    .orderBy('material.type')
    .getMany()

    // const data = await this.materialRepository.findAndCount();
    return res
  }

  async getMaterialById (id: string){
    const data = this.materialRepository.findOneOrFail({
      where: {
        id,
      },
      // relations: ['children']
    });
    return data
  }

  async updateMaterial (comInfo, userId){
    const { id, ...rest } = comInfo

    if(rest.panel !== undefined){
      // 设置默认值
      rest.panel = rest.panel ? rest.panel : {
        infoConfig: {
          values: {},
          formItems: []
        },
        eventConfig: {
          values: {},
          formItems: []
        }
      }
    }

    if(rest.dataValues !== undefined){
      // 设置默认值
      rest.dataValues = rest.dataValues ? rest.dataValues: {
        isOrigin: '0'
      };
    }




    const material = this.materialRepository.merge(new Material(), rest)
    try{
      const findRes = await this.materialRepository.findOneOrFail({
        where: {
          id,
        },
      })
    } catch(err){
      throw new InternalServerErrorException("组件id不存在")
    }

    material.id=id
    material.status = '0'

    const res = await this.materialRepository.save(material)

    return res
  }

  async publishMaterial (comInfo) {

    const {id, ...rest} = comInfo

    // 设置默认值
    rest.panel = rest.panel ? rest.panel : {
      infoConfig: {
        values: {},
        formItems: []
      },
      eventConfig: {
        values: {},
        formItems: []
      }
    }

    rest.dataValues = rest.dataValues ? rest.dataValues: {
      isOrigin: '0'
    };

    rest.status = '1'

    const res = this.materialRepository.update(id, rest)

    return res

  }

  async deleteMaterialById (id: string) {
    const data = await this.materialRepository.delete(id);
    return data
  }

}
