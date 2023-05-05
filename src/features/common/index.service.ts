import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import  {Transporter, createTransport, SendMailOptions, SentMessageInfo} from 'nodemailer'
import { Repository } from 'typeorm'
// import { Material } from '@/entities/Material'
import config from '@/config'
import {createCode} from '@/utils'

@Injectable()
export default class CommonService {
  constructor(
    // @InjectRepository(Material)
    // private readonly materialRepository: Repository<any>
  ){}

  /**
   * @description 注册账号
   * @param {ISaveUser} user
   * @returns {Promise<IResUser>}
   * @memberof UserService
   */
  async sendCode (email: string): Promise<any> {
    const { emailConfig } = config
    let transporter:Transporter = createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: true, // true for 465, false for other ports
      auth: {
        user:  emailConfig.user,
        pass: emailConfig.pass,
      }
    });

    const realCode = createCode()
    let mailOptions: SendMailOptions = {
      from: 'qd361_sp@163.com', // sender address
      to: email, // list of receivers
      subject: '乌雀互联', // Subject line
      // 发送text或者html格式
      // text: 'Hello world?', // plain text body
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>验证码</title>
        <style type="text/css">
        .email-box {
          height: 500px;
          width: 100%;
          background: #D0E6E1;
          padding: 20px;
        }

        .email-code{
          color: rgb(17, 48, 223);
          text-decoration: underline;
          font-size: 30px;
          width: 100%;
          text-align: center;
        }
        </style>
      </head>
      <body>
        <div class="email-box">
          <h4 class="net-name">乌雀互联提醒您：</h4>
          <div class="email-info">
            尊敬的用户，您正在使用
            <a href="http://">PG低代码系统</a>，
            本次的验证码为：
            <span class="email-code">${realCode}</span>
          </div>

        </div>
      </body>
      </html>
      `, // html body
    };
    await transporter.sendMail(mailOptions)
    return {
      code: realCode
    }
  }

  /**
   * @description 邮箱登录
   * @param {ISaveUser} user
   * @returns {Promise<IResUser>}
   * @memberof UserService
   */
  async sendPassword (email: string): Promise<any> {
    const { emailConfig } = config
    let transporter:Transporter = createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: true, // true for 465, false for other ports
      auth: {
        user:  emailConfig.user,
        pass: emailConfig.pass,
      }
    });

    const realCode = createCode()
    let mailOptions: SendMailOptions = {
      from: 'qd361_sp@163.com', // sender address
      to: email, // list of receivers
      subject: '乌雀互联', // Subject line
      // 发送text或者html格式
      // text: 'Hello world?', // plain text body
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>验证码</title>
        <style type="text/css">
        .email-box {
          height: 500px;
          width: 100%;
          background: #D0E6E1;
          padding: 20px;
        }

        .email-code{
          color: rgb(17, 48, 223);
          text-decoration: underline;
          font-size: 30px;
          width: 100%;
          text-align: center;
        }
        </style>
      </head>
      <body>
        <div class="email-box">
          <h4 class="net-name">乌雀互联提醒您：</h4>
          <div class="email-info">
            尊敬的用户，您已成功注册
            <a href="http://">PG低代码系统</a>，
            初始密码为：
            <span class="email-code">${realCode}</span>
          </div>

        </div>
      </body>
      </html>
      `, // html body
    };
    await transporter.sendMail(mailOptions)
    return realCode
  }

}
