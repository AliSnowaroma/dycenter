import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getConnection, SelectQueryBuilder, Entity} from 'typeorm'
import { Material } from '@/entities/Material'
import { User } from '@/entities/User'
import { AddMaterial } from '@/controllers/material/index.dto'

@Injectable()
export default class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<any>,

    @InjectRepository(User)
    private readonly userRepository: Repository<any>,

  ){
  }

  async add(comInfo: AddMaterial){
    let { panel, code, dataValues, ...rest } = comInfo
    const data = {
      ...rest,
      dataValues: {
        isOrigin: '0'
      },
      code: code ? code : {
        js: `import React from 'react'\n// import { Button } from 'antd' //使用antd时引入\n// import { Chart, Interval, Tooltip, getTheme } from 'bizcharts'; // 使用bizcharts时引入\nimport './index.scss'\n\n/**\n * @param props \n * data 组件数据\n * width height 组件宽高\n * configValues 动态配置json\n */\nexport default function App(props) {\n  const { data, width, height, configValues } = props\n  return (\n    <div>\n      jsx模板\n    </div>\n  )\n}\n`,
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
    const res = this.materialRepository.insert(data)
    return res
  }

  async getMaterialList(status?: string){
    const res = status
    ? await this.materialRepository.createQueryBuilder('material')
    .select()
    .where(`material.status = :status`, {status: status})
    .getMany()

    : await this.materialRepository.createQueryBuilder()
    .select('Material')
    .getMany()

    // const data = await this.materialRepository.findAndCount();
    return res
  }

  // async getDraftMaterialList(){
  //   const res = await this.materialRepository.createQueryBuilder()
  //   .select('Material')
  //   .innerJoinAndSelect('Material.children', 'vmaterial')
  //   .getMany()

  //   // const data = await this.materialRepository.findAndCount();
  //   return res
  // }

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

    const material = this.materialRepository.merge(new Material(), rest)
    material.id=id

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
    const data = this.materialRepository.delete(id);
    return data
  }

}