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
      subject: '智慧PG验证码', // Subject line
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

        .dingzhi-box{
          width: 100%;
          text-align: center;
          font-size: 30px;
        }

        .mark-text{
          color:rgb(17, 48, 223);
        }

        .qrcode{
          width: 100px;
          height: 100px;
        }

        .brief-box p {
          color: #1e2525;
          font-size: 14px;
          margin: 0;
          line-height: 30px;
        }
        </style>
      </head>
      <body>
        <div class="email-box">
          <h4 class="net-name">智慧PG提醒您：</h4>
          <div class="email-info">
            尊敬的用户，您正在使用
            <a href="https://www.pgting.com">智慧PG低代码系统</a>，
            本次的验证码为：
            <span class="email-code">${realCode}</span>
          </div>
          <div class="brief-box">
            <p>智慧PG是一款智能中台搭建产品，拖拽式搭建，支持多框架融合，组件共享，目前主要应用于中台搭建，可视化搭建等领域</p>
            <p>智慧PG系统内置大量算法自研，拥有线上编译引擎，表单渲染引擎，中台互联等，系统采用React + TypeScript技术栈，扩展性强。<p>
          </div>
          <div class="dingzhi-box">
            <p class="mark-text">提供系统定制，私有化部署服务</p>

            <img class="qrcode" src="https://s1.ax1x.com/2023/05/22/p9oaGqK.png" alt="">
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
      subject: '智慧PG初始密码', // Subject line
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

          .dingzhi-box{
            width: 100%;
            text-align: center;
            font-size: 30px;
          }

          .mark-text{
            color:rgb(17, 48, 223);
          }

          .qrcode{
            width: 100px;
            height: 100px;
          }

          .brief-box p {
            color: #1e2525;
            font-size: 14px;
            margin: 0;
            line-height: 30px;
          }
          </style>
        </head>
        <body>
          <div class="email-box">
            <h4 class="net-name">智慧PG提醒您：</h4>
            <div class="email-info">
              尊敬的用户，您已成功注册
              <a href="https://www.pgting.com">智慧PG低代码系统</a>，
              初始密码为：
              <span class="email-code">${realCode}</span>
            </div>
            <div class="brief-box">
              <p>智慧PG是一款智能中台搭建产品，拖拽式搭建，支持多框架融合，组件共享，目前主要应用于中台搭建，可视化搭建等领域</p>
              <p>智慧PG系统内置大量算法自研，拥有线上编译引擎，表单渲染引擎，中台互联等，系统采用React + TypeScript技术栈，扩展性强。<p>
            </div>
            <div class="dingzhi-box">
              <p class="mark-text">提供系统定制，私有化部署服务</p>

              <img class="qrcode" src="https://s1.ax1x.com/2023/05/22/p9oaGqK.png" alt="">
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
