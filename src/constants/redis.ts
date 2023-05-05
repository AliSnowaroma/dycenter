// {token: '', ex: xxx, ts: xxx}
import config from '@/config'
const REDIS_PREFIX_KEY = `${config.name.toUpperCase()}_TOKEN_`

export default {
  REDIS_PREFIX_KEY,
}
