# 阻止Google浏览器自动更新
+ 先将电脑上的高版本Google浏览器卸载
+ 安装旧版本google浏览器、安装完毕之后先关闭防止自动更新
+ 禁用google浏览器自动更新
> C:\Program Files (x86)\Google     这个目录下

![图片加载失败](../../img/google-config-1.png)

+ 右键：属性>安全>高级>禁用继承>删除所有继承>应用>确认

![图片加载失败](../../img/google-config-2.png)

+ 操作完成打开google浏览器 关于google页面 疯狂刷新看会不会自动更新，不会自动更新就ok啦

![图片加载失败](../../img/google-config-3.png)

+ 搜索栏输入chrome://flags/ > 输入框搜SameSite > 搜索结果第一个 设置Disabled > 然后右下角重启一下

![图片加载失败](../../img/google-config-4.png)