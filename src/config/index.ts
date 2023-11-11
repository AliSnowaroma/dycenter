const path = require('path')
import * as pkg from '../../package.json'

const env = process.env.API_ENV === 'real' ? 'real' : 'dev'
const config: EnvConfig = require(`./${env}`).default

config.name = pkg.name
config.basedir = path.resolve(__dirname, '../../')

export default config
