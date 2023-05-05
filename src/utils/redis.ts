import * as Redis from 'redis'
import config from '@/config'
import { C_ERROR, C_REDIS } from '@/constants'
import uLogger from './logger'
import uType from './type'

const { host, port, password } = config.redis

// format redis[s]://[[username][:password]@][host][:port][/db-number]:
const client: any = Redis.createClient({
  url: `redis://:${password}@${host}:${port}`,
  // legacyMode: true 4.0版本之前的api，加上之后，新的api不生效
});

async function setRedis (key: string, value: any, ex?: number) {
  if (!uType.isNull(value) && !uType.isUndefined(value)) {
    const newValue: string = JSON.stringify(value)
    if(ex){
      return await client.set(`${C_REDIS.REDIS_PREFIX_KEY}${key}`, newValue, {
        'EX': ex
      })
    } else {
      return await client.set(`${C_REDIS.REDIS_PREFIX_KEY}${key}`, newValue)
    }
  }
}

async function getRedisSync (key: string): Promise<any> {
  try{
    const res = await client.get(`${C_REDIS.REDIS_PREFIX_KEY}${key}`)
    if (!uType.isNull(res) && !uType.isUndefined(res)) {
      const newRes: any = JSON.parse(res)
      return newRes
    } else {
      return null
    }
  } catch(error){
    uLogger.logger.error({ ...C_ERROR.REDIS_GET, track: error })
    return null
  }
}

async function delRedis (key: string): Promise<void> {
  await client.del(`${C_REDIS.REDIS_PREFIX_KEY}${key}`)
}

async function setnx (key: string, expiryDate?: number): Promise<any> {
  return new Promise(function (resolve: any): void {
    client.setnx(key, true, function (error: any, res: any) {
      if (error) {
        uLogger.logger.error({ ...C_ERROR.REDIS_SET, track: error })
      }

      if (res === 1) {
        resolve(true)
      } else {
        resolve(false)
      }

      if (expiryDate) {
        client.expire(`${C_REDIS.REDIS_PREFIX_KEY}${key}`, expiryDate)
      }
    })
  })
}

export default {
  client,
  setRedis,
  getRedisSync,
  delRedis,
  setnx,
}
