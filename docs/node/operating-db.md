# NodeJs 操作数据库

## 连接mySql
```js
const mysql = require('mysql')
const db = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'xxx',
  database: 'xxx'
})
module.exports = db
```

## 数据库-查询
```js
const sqlStr = 'select * from user where username = ?'
db.query(sqlStr, userInfo.username, (err, data) => {

})
```

## 数据库-增加

## 数据库-删除

## 数据库-修改

