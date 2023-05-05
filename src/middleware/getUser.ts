import { parseToken, uRedis } from '@/utils'
import { TOKEN } from '@/constants'

export default async function getUser(req, _res, next) {
  const headers = req.headers
  const tokenKey = headers['x-pg-token']
  const cacheToken = await uRedis.getRedisSync(tokenKey)

  if(cacheToken){
    const userInfo: any = parseToken(cacheToken, TOKEN.sceret, TOKEN.iv) ?? {}
    req.userId = userInfo.sub || null
  }

  next();
};
