const mysqlConfig = {
  port: 3306,
  host: 'localhost',
  username: 'root',
  password: 'dy123456',
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
    host: '127.0.0.1',
    port: 6379,
    password: '123456',
  },
}

export default config
