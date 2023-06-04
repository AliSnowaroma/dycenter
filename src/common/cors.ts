const allowlist = [
  'http://localhost:9999',
  'http://127.0.0.1:9999',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3533',
  'https://www.pgting.com',
  'http://www.pgting.com',
  'http://120.27.151.113',
  'http://localhost:3000',
  'http://localhost'
];

const corsOptionsDelegate = (req: any, callback) => {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {

　　//如果不需要 Cookie 可以设置为 *

　　// credentials 与前端的axios 的withCredentials（XMLHttpRequest.withCredentials）

 　 // 同时 origin必须设置为访问域 才能正常访问，主要是为了 凭证是 Cookie ，授权标头或 TLS 客户端证书

        corsOptions = { origin: req.header('Origin'), credentials : true };

    } else {

        corsOptions = { origin: false }; // disable CORS for this request

    }

    callback(null, corsOptions); // callback expects two parameters: error and options

}

export default corsOptionsDelegate
