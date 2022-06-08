# 自定义脚本
## 批量修改svn项目引入时间的时间戳
```js
const fs = require('fs')
const path = require('path')

// 获取当前时间
const getTimestamp = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}${month}${day}${hour}${minute}${second}`
}

let counter = 0 // 记录一共修改文件个数

const modifyFile = (fileName) => {
  fs.readFile(path.join(__dirname, fileName),'utf8',(err,data)=>{
    if(err) throw err
    let regScript = /<script\ssrc=[\"|'][\s\S]*[\"|']><\/script>+/gi; // 匹配script标签
    let regSrc = /<script [^>]*src=['"]([^'"]+)[^>]*/gi; // 匹配script标签中的src
    let arr = data.match(regScript) // 匹配到的script标签数组
    if(arr){
      let resultArr = arr[0].replace(regSrc,(item1,item2)=>{
        if(item2.indexOf('?') !== -1){
          item2 = item2.slice(0,item2.indexOf('?'))
        }
        return '<script src="' + item2 + '?' + getTimestamp(new Date()) + '"'
      })
      fs.writeFile(path.join(__dirname, fileName), data.replace(regScript,resultArr),  function(err) {
        if(err) throw err
        counter ++
        console.log(fileName + ' 修改成功', counter);
      })
    } else {
      console.log(fileName + ' 没有找到script标签')
    }
  })
}

fs.readdir(path.join(__dirname, './'), 'utf8', (err, files) => {
  if(err) throw err
  console.log(".html或.htm结尾的文件共" + files.filter(e=>e.indexOf('.html') !== -1 || e.indexOf('.htm') !== -1).length + "个");
  files.forEach(file => { 
    if (path.extname(file) == ".html" || path.extname(file) == ".htm") {
      // 根目录下如果是html类型的文件执行修改操作
      modifyFile(file)
    }
  }) 
})
```