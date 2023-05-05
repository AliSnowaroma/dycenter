// 内部错误
const APP_LISTEN: IError = {
  code: '1000',
  msg: '应用启动失败',
}
const MONGODB_CONNECT: IError = {
  code: '1001',
  msg: 'MongoDB连接失败',
}
const MONGODB_DISCONNECT: IError = {
  code: '1002',
  msg: 'MongoDB取消连接',
}
const REDIS_CONNECT: IError = {
  code: '1003',
  msg: 'Redis连接失败',
}
const REDIS_DISCONNECT: IError = {
  code: '1004',
  msg: 'Redis取消连接',
}
const REDIS_SET: IError = {
  code: '1005',
  msg: 'Redis注入错误',
}
const REDIS_GET: IError = {
  code: '1006',
  msg: 'Redis获取错误',
}
const ERROR_JAVASCRIPT: IError = {
  code: '1007',
  msg: '语法错误',
}

// 400错误

// 抛到前端的错误
const LOGIN: IError = {
  code: '206',
  msg: '请登录',
}
const UPLOAD: IError = {
  code: '5001',
  msg: '上传失败',
}
const SERVER_REQUEST: IError = {
  code: '5002',
  msg: '服务端请求异常',
}
const SERVER_BUSINESS: IError = {
  code: '5003',
  msg: '服务端业务异常',
}
const SERVER_SQL: IError = {
  code: '5004',
  msg: '数据库请求异常',
}
const NO_USER: IError = {
  code: '5005',
  msg: '找不到该用户',
}

const PAGE_EXISTED: IError = {
  code: '5006',
  msg: '页面已存在',
}

const DATA_NOT_EXISTED: IError = {
  code: '5007',
  msg: '操作的信息不存在',
}

const APPLICATION_EXISTED: IError = {
  code: '5008',
  msg: '应用已存在',
}

const TRACK_ID_EXISTED: IError = {
  code: '5009',
  msg: '埋点Id记录已存在',
}

const REPORT_NOT_EXISTED: IError = {
  code: '5009',
  msg: '找不到该报表信息',
}

const PWD_ERR: IError = {
  code: '4444',
  msg: '密码错误',
}

const RULES_NOT_EXISTED: IError = {
  code: '5010',
  msg: '找不到该应用规则信息',
}

const NO_USERLIST: IError = {
  code: '5011',
  msg: '获取用户信息异常',
}

export default {
  APP_LISTEN,
  MONGODB_CONNECT,
  MONGODB_DISCONNECT,
  REDIS_CONNECT,
  REDIS_DISCONNECT,
  REDIS_SET,
  REDIS_GET,
  LOGIN,
  UPLOAD,
  SERVER_REQUEST,
  SERVER_BUSINESS,
  SERVER_SQL,
  ERROR_JAVASCRIPT,
  NO_USER,
  PAGE_EXISTED,
  DATA_NOT_EXISTED,
  APPLICATION_EXISTED,
  TRACK_ID_EXISTED,
  REPORT_NOT_EXISTED,
  PWD_ERR,
  RULES_NOT_EXISTED,
  NO_USERLIST,
}
