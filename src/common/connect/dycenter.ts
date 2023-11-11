import { createConnection, Connection } from 'typeorm'
import { Module, DynamicModule } from '@nestjs/common'
import config from '@/config'
const { host, port, username, password, database } = config.mysqlConfig

const getconnection = async function () {
  const connection = await createConnection({
    name: 'default',
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
  })

  return connection
}

@Module({})
class CustomModule {
  static forRoot(entities = [], options?): DynamicModule {
    return {
      module: CustomModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
    }
  }
  static forFeature() {}
}

export default CustomModule
