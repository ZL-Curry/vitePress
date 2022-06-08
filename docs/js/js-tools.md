# js 常用的工具函数

## 时间格式化

```js
const formatDate = function (data) {
  const dt = new Date(data)
  const y = zeroize(dt.getFullYear())
  const m = zeroize(dt.getMonth() + 1)
  const d = zeroize(dt.getDate())
  const hh = zeroize(dt.getHours())
  const mm = zeroize(dt.getMinutes())
  const ss = zeroize(dt.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
```

## 数字金额转为中文大写金额

> 例如 47580.53 转为 肆万柒千伍百捌拾元伍角叁分

```js
const num2Money = function(n) {
  if(!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
    return "数据非法"
  var unit = "千百拾亿千百拾万千百拾元角分",
    str = ""
  n += "00"
  var p = n.indexOf('.')
  if(p >= 0)
    n = n.substring(0, p) + n.substr(p + 1, 2)
  unit = unit.substr(unit.length - n.length)
  for(var i = 0 i < n.length i++)
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
  return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g,
    "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整")
}
```

## 获取 url 参数

```js
export function getUrlParam(name, origin = null) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = null
  if (origin == null) {
    r = window.location.search.substr(1).match(reg)
  } else {
    r = origin.substr(1).match(reg)
  }
  if (r != null) return decodeURIComponent(r[2])
  return null
}
```

## 把对象格式化为 url 路径参数格式

```js
const formatParams = function (obj) {
  var arr = []
  for (var key in obj) {
    if (obj[key] instanceof Array) {
      for (var i = 0 i < obj[key].length i++) {
        arr.push(key + "=" + (obj[key][i] ? obj[key][i] :''))
      }
    } else {
      arr.push(key + "=" + (obj[key] ? obj[key] : ''))
    }
  }
  return arr.join("&")
}
```

## 生成指定范围随机数

```js
/**
 *
 */
const randomNum = function (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  var num = Min + Math.round(Rand * Range) //四舍五入
  return num
}
```

## 把时长秒转化为 （时分秒)

```js
const formatSeconds = function (value) {
  var theTime = parseInt(value) // 秒
  var theTime1 = 0 // 分
  var theTime2 = 0 // 小时
  var rs = {
    h: 0,
    m: 0,
    s: 0,
  }
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }
  rs.s = parseInt(theTime)
  if (theTime1 > 0) {
    rs.m = parseInt(theTime1)
  }
  if (theTime2 > 0) {
    rs.h = parseInt(theTime2)
  }
  return rs
}
```

## 全屏

```js
const fullScreen = function (me) {
  var el = document.documentElement
  var rfs =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullScreen
  if (typeof rfs != 'undefined' && rfs) {
    rfs.call(el)
  } else if (typeof window.ActiveXObject != 'undefined') {
    var wscript = new ActiveXObject('WScript.Shell')
    if (wscript != null) {
      wscript.SendKeys('{F11}')
    }
  }
  me.hide()
  me.siblings('.exitFullScreen').show()
}
```

## 退出全屏

```js
const exitFullScreen = function (me) {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
  me.hide().siblings('.enterFullScreen').show()
}
```

## 首字母大写

```js
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('')
```

## 每个单词首字母大写

```js
const capitalizeEveryWord = (str) =>
  str.replace(/\b[a-z]/g, (char) => char.toUpperCase())
```

## decapitalize

```js
const decapitalize = ([first, ...rest]) => first.toLowerCase() + rest.join('')
```

## 防抖函数

```js
/**
 * @param { function } func
 * @param { number } wait 延迟执行毫秒数
 * @param { boolean } immediate  true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate) {
  let timeout
  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}
```

## 节流函数

```js
/**
 * @param { function } func 函数
 * @param { number } wait 延迟执行毫秒数
 * @param { number } type 1 表时间戳版，2 表定时器版
 */
export function throttle(func, wait, type) {
  let previous, timeout
  if (type === 1) {
    previous = 0
  } else if (type === 2) {
    timeout = null
  }
  return function () {
    let context = this
    let args = arguments
    if (type === 1) {
      let now = Date.now()

      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}
```
