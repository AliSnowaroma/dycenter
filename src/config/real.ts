const mysqlConfig = {
  port: 3306,
  host: '120.27.151.113',
  username: 'root',
  password: '122!aA6677',
  database: 'dycenter',
}

const config: EnvConfig = {
  mysqlConfig,
  emailConfig: {
    host: 'smtp.163.com',
    port: 465,
    user: 'qd361_sp@163.com',
    pass: 'GGWLQUQVGQYEQHSR',
  },
  redis: {
    host: '120.27.151.113',
    port: 6379,
    password: '6688redis',
  },
}

export default config
