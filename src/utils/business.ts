import { generatePrime } from "crypto";

const crypto = require('crypto')
export function createCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
      code+=Math.floor(Math.random()*10);
  }
  return code
}

// 加密
export function genSign(src, key, iv) {
  let sign = '';
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  sign += cipher.update(src, 'utf8', 'hex');
  sign += cipher.final('hex');
  return sign;
}

// 解密
export function deSign(sign, key, iv) {
  let src = '';
  const cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  src += cipher.update(sign, 'hex', 'utf8');
  src += cipher.final('utf8');
  return src;
}

export function createToken (data, sceret, iv) {
  data.sign=crypto.randomBytes(5).toString('hex')
  const jsonString = JSON.stringify(data)
  const key = Buffer.from(sceret, 'utf8')
  const ivBuffer = Buffer.from(iv, 'utf8')
  const sign = genSign(jsonString, key, ivBuffer)

  return sign
}

export function parseToken (token, sceret, iv) {
  const key = Buffer.from(sceret, 'utf8')
  const ivBuffer = Buffer.from(iv, 'utf8')

  const data = deSign(token, key, ivBuffer)
  return JSON.parse(data)

}

export function generatePrimaryId(num?: number){
  return num ? crypto.randomBytes(num).toString('hex') : crypto.randomBytes(15).toString('hex')
}
