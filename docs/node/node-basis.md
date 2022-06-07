# NodeJs

## fs 模块
```js
  const fs = require('fs')
  /**
  * 参数1必填表示文件路径
  * 参数2可选文件编码
  * 参数3必填是回调函数
  */
  fs.readFile('./testFile.md', 'utf-8', function (err, data) {
     if (err) throw err
     console.log(data)
  })

  /**
  * 参数1：文件路径
  * 参数2: 文件内容
  * 参数3: 文件编码 默认utf-8
  * 参数4: 回调函数
  */
  fs.writeFile('./testFile.txt','测试写入文件功能','utf-8',function(err,data){
    if(err) throw err
    console.log('写入成功',data);
  })
  // __dirname 表示当前文件所在目录 可以于动态拼接文件路径
  console.log(__dirname);
```

## path 模块

```
  /**
  * path.join(',') 用来将多个路径片段拼接出一个完整的路径字符串
  * path.basename()方法，用来从路径字符串中将文件名解析出来
  * path.extname()方法，可以获取路径中的拓展名
  */
  const path = require('path')
  // ../会抵消前面的路径
  const str1 = path.join('/a','/b/c','../', './d','e')
  const str2 = path.join(__dirname,'./d','e')
  console.log(str1); // \a\b\d\e
  console.log(str2); // E:\Babalu\NodeJs\d\e
  const testPath = '/test/file/filename.md'
  console.log(path.basename(testPath)); // filename.md
  console.log(path.extname(testPath)); // .md
  const testPathName = path.basename(testPath,'.md') 
  console.log(testPathName); // filename
```

## http 模块
```
  // http模块
  const http = require('http');
  const server = http.createServer()
  server.on('request',function(req,res) {
    // req.url // 请求的url
    // req.method // 请求的方法
    const url = req.url
    let content = '<h1>404 页面找不到了</h1>'
    if(url === '/' || url === '/index.html') {
      content = '<h1>这是首页</h1>'
    } else if(url === '/about.html') {
      content = '<h1>这是关于页面</h1>'
    }
    // 防止中文乱码的问题 设置响应头 
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end(content)
  })
```

## 中间件

```
const express = require('express')
const app = express()
// 多个中间件共享一个req和res。可以在上层中间件对数据进行统一处理
const middleWare = function(req,res,next){
  console.log('这是一个中间件函数');
  // 把流转关系转交给下一个中间件或者路由
  req.name="babalu"
  next()
}
const middleWare2 = function(req,res,next){
  console.log('这是一个中间件函数2');
  next()
}
app.use(middleWare)
app.use(middleWare2)
// 局部中间件，不会影响其他的路由
// [middleWare,middleWare2] 效果同下
app.get('/user',middleWare,middleWare2, (req,res)=>{
  throw new Error('出错了')
  res.send({aaa:'奥里给'+ req.name},)
})

// 错误级别的中间件
app.use((err,req,res,next)=>{
  console.log('这是错误级别的中间件');
  res.send({err:err.message})
})
app.listen('80',()=>{
  console.log('server is running');
})
```

## npm 包发布

- 1、登录 npm 账号
- 2、在终端执行 npm login
- 3、在运行 npm login 命令之前，必须先把下包的服务器切换成 npm 官方的服务器，否则可能会发布失败
- 4、nrm 可以切换 npm 服务器
- 5、切换到包的根目录之后执行 npm publish
- 6、npm unpublish 包名 --force 删除已发布的 npm 包

> express 中中间件的分类

- 应用级别 （通过 app.use、app.get、app.post,这种绑定到 app 实例上的）
- 路由级别 （绑定到 express.Router 实例上的中间件）
- 错误级别 （用来捕获整个项目中发生的异常错误，防止项目异常崩溃）
  - 错误级别中间件的函数中必须有 4 个形参、（err, req, res, next）
  - 错误级别中间件必须放在所有路由的后面
- express 内置
  - express.static (托管静态资源的中间件)
  - express.json (解析 json 格式的请求体数据)
  - express.urlencoded （解析 URL-encoded 格式的请求数据）
  -
- 第三方

## 连接mySql

```
const mysql = require('mysql')
const db = mysql.createPool({ // 建立与mysql数据库的连接
  host: 'localhost', // 本机地址
  port: '3306', // 端口号
  user: 'root', // 用户名
  password: 'zl0427', // 密码
  database: 'babalu' // 连接数据库名
})
db.query('select * from users',(err,data)=>{
  if(err) throw err
  console.log(data);
})
const user = { username: 'spad112323e', password: '12345126' }
const sql = 'insert into users (username,password) values (?,?)'
db.query(sql, [user.username,user.password],(err,data)=>{
  console.log(err,data);
  if(err) throw err
  if(data.affectedRows === 1) {console.log('操作成功');} 
})

const user = { username: '23123sadf123123', password: 'fdas' }
const sql = 'insert into users set ?'
db.query(sql, user,(err,data)=>{
  console.log(err,data);
  if(err) throw err
  if(data.affectedRows === 1) {console.log('操作成功');} 
})
```

## express 
```
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
// 配置解析 application/json 格式数据的内置中间件
app.use(express.json())
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({extended:false}))
const userRouter = require('./router/user')
// 挂载路径前缀
app.use('/api',userRouter)
// 静态资源服务器、可以直接方位public下面的所有文件
app.use(express.static('public'))
// 挂载路径前缀
app.use('/files',express.static('files'))
app.get('/user',(req,res)=>{
  res.send({success:true,resultData:{name:'zhangsan',age:18}})
})
app.get('/userInfo',(req,res)=>{
  // req.query可以拿到查询字符串
  let queryParams = req.query;
  res.send(queryParams)
})
app.get('/userInfo/:id/:name',(req,res)=>{
  // req.params可以拿到路由中的动态参数
  let params = req.params;
  res.send(params)
})
app.post('/user',(req,res)=>{
  res.send({name:"babalu"})
})

app.listen('80',()=>{
  console.log('server is running');
})
```

## JWT 认证
```
// JWT认证机制通常由3部分组成：
// 1、Hearder(头部)，2、Payload(有效载荷)，3、Signature(签名) 三者由英文.进行分割

// yarn add jsonwebtoken express-jwt
// jsonwebtoken 用来生成JWT字符串
// express-jwt 用来将jwt字符串解析还原成JSON对象
const express = require('express')
const cors = require('cors')
const app = express()

const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

app.use(cors())

// 配置解析 application/json 格式数据的内置中间件
app.use(express.json())
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: true }))

const secretKey = 'babalu ^_^'
// 注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(
  expressJwt({ secret: secretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/api\//],
  })
)

app.post('/api/login', (req, res) => {
  const userinfo = req.body
  console.log(userinfo)
  if (userinfo.username !== 'babalu' || userinfo.password !== '123456') {
    return res.send({
      status: 400,
      message: '用户名或密码错误',
    })
  }
  /**
   * 生成jwt字符串
   * @param1 {Object} 用户的信息对象
   * @param2 {String} 加密密钥
   * @param3 {Number} 可以配置当前token的有效期
   */
  const tokenStr = jwt.sign({ userinfo: userinfo.username }, secretKey, {
    expiresIn: '60s',
  })
  res.send({
    status: 200,
    message: '登录成功',
    token: tokenStr,
  })
})

// 这是一个有权限的 API 接口
app.get('/admin/infor', function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user)
  // 接口请求测试时 header 中 Authorization 的value要加上 Bearer 前缀加空格 再拼上token
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user, // 要发送给客户端的用户信息
  })
})

app.use((err, req, res, next) => {
  let error = {
    code: '',
    message: '',
  }

  if (typeof err === 'string') {
    error.code = '10009'
    error.message = err
    return res.status(400).json(error)
  }

  if (err.name === 'UnauthorizedError') {
    error.code = '401'
    error.message = 'Invalid Token'
    return res.status(401).json(error)
  }

  // default to 500 server error
  error.code = '500'
  error.message = 'Internal Server Error'
  return res.status(500).json(error)
})

app.listen(80, () => {
  console.log('server is running at port 80')
})
```

## 通过路由读取文件案例 (fs、path、http)

```
const fs = require('fs')
const path = require('path')
const http = require('http')
const server = http.createServer()
server.on('request',(req,res)=>{
  const url = req.url
  let filePath = ""
  if(url === '/') {
    filePath = path.join(__dirname, './clock/index.html')
  } else {
    filePath = path.join(__dirname,'./clock', url)
  }
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  fs.readFile(filePath,'utf-8',function(err,data){
    if(err) {
      return res.end('404 not found')
    }
    res.end(data)
  })
})
server.listen('80',function(res){
  console.log('server is running at port 80');
})
```

## 拆分html文件案例

```
const fs = require("fs")
const path = require("path")
/**
 * \s 表示空白字符
 * \S 表示非空白字符
 * * 表示匹配任意次数
 */
const regStyle =  /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/ 

fs.readFile(path.join(__dirname,'./index.html'),'utf8',(err,data)=>{
  if(err) throw err
  resolveFunc(data,['<style>','</style>'],'index.css')
  resolveFunc(data, ['<script>','</script>'],'index.js')
  resolveHtml(data)
})

function resolveFunc(data,tagArr,fileName){
  let str = ''
  if(path.extname(fileName) === '.css'){
    str = regStyle.exec(data)
  } else if(path.extname(fileName)==='.js'){
    str = regScript.exec(data)
  }
  let cssString = str[0].replace(tagArr[0],'').replace(tagArr[1],'')
  fs.writeFileSync(path.join(__dirname, `./clock/${fileName}`), cssString, (err) => {
    if(err) throw err
    console.log('写入css成功');
  })
}

function resolveHtml(data){
  let htmlStr = data
    .replace(regStyle, '<link ref="stylesheet" href="../clock/index.css" >')
    .replace(regScript,'<script src="../clock/index.js"></script>')
  fs.writeFile(path.join(__dirname,'./clock/index.html'), htmlStr,'utf8', err=>{
    if(err) throw err
    console.log('操作成功');
  })
}
```

## 生成文件
```
/**
 * 
 * @param {*} readFilePath 读取文件路径
 * @param {*} generateFilePath 生成文件路径
 * @param {*} generateFileName 生成文件名
 */
const generatePage1 = function(readFilePath,generateFilePath,generateFileName){
  fs.readFile(readFilePath + '.vue', 'utf-8', function (err, data) {
    if (err) throw err
    let _data = data.replace("name: ''", "name: '"+generateFileName+"'")
    fs.writeFile(generateFilePath + '/' + generateFileName + '.vue',_data,'utf-8',function(err,data){
      if(err) throw err
      console.log('写入成功',data);
    })
  })
}
```