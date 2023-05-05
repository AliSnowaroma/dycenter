interface IError {
  code: string;
  msg: string;
}

interface IDataResponse {
  code?: string;
  msg?: string;
  message?: string;
  data?: any;
  success: boolean;
}

interface DyObj {
  [key: string]: any
}

interface EnvConfig {
  mysqlConfig: {
    port: number,
    host: string,
    username: string,
    password: string,
    database: string
  },
  emailConfig: {
    host: string,
    port: number,
    user: string,
    pass: string
  },
  name?: string,
  basedir?: string,
  redis?: any
}
