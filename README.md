##MyWebsite1
之前多次尝试做个人网站，想要把自己的小作品和小项目整理发布，同时能发布规整学习笔记，和大家分享。但一直都对界面和效果不够满意，因此一直更改，直到现在，和一个做后台的小哥哥合作，经团队（虽然只是个二人团~）合作，受到鞭策，终于算是得到初步成型的平台了，当然还是不够满意，后面也会继续改进~
##演示地址：http://xh.e-j.me:89 ,  http://xh.e-j.me:89/admin
###系统功能大概如下（由于时间关系，部分功能暂时未完成）
####基本已完成：
* 文章日志
  * 无限分类、标签
  * 增、删、改、查
  * 权限管理(公开、私密、密码访问）
  * 分页查看
* 相册管理
  * 批量上传
  * 生成缩略图
  * 添加水印
  * 权限管理(公开、私密、密码访问)
  * 批量管理(删除，移动)
  * 相册封面设置
  * 相册、照片信息修改
  * 前台瀑布流布局
  * 小畜生
* 作品管理
  * 作品压缩包上传
  * 解压、访问(静态网页)
  * 无限分类、作品标签
  * 前台瀑布流展示，异步加载
* 统计管理
  * 文章、作品等访问统计
####待完成：
* 用户管理
  * 用户组
  * 注册、登录、权限控制
  * 管理、编辑
* 评论管理
  * 文章、相册、作品等评论、回复、点赞、转发、分享
* 系统管理
  * 系统备份、邮件发送等
   
###系统实现方式（主要介绍前端部分，挑喜欢的几个点介绍）
####前台部分：
* 主页
  * 内容分为七大部分：整站展示、近期作品展示、About me、留言吧动态、学习笔记摘要、技术标签选择、联系我
  * 响应式布局，在三类不同设备上展现三种样式，都能顺利过渡，着重体现在“留言吧动态”区
  * 其中包括全屏轮播、滚动背景和一些特效，并用js控制了导航区的高亮显示，即在每一个页面下根据URL来高亮显示对应菜单  
* 作品展
  * 通过绝对定位实现瀑布流异步加载
* 学习笔记
  * 文章列表中多行文本自动截取和超出部分省略号显示  
* 相册分享
  * 主要在于缩略图的处理，此处设计规定了图片容器大小，在加载时通过数学计算将图片等比缩小，超出容器部分设置margin而使其显示正居中的部分
  
  
###此次学习感悟
* 图片处理 
   * 在做瀑布流部分的时候发现一个以前没有注意的现象，就是页面刷新时图片加载过程中偶尔会错位，但大多数时候又能正常显示，检查了好几次代码，确定代码中对定位的取值等都没有错误，不明白问题出在哪里。上网搜了一下才知道是图片加载的问题，图片在请求过来的过程中，尚未完全加载完成，此时计算的width和height都不准确，也就会影响下面的定位的计算。之后我将瀑布流中涉及计算的核心函数放在图片加载完成之后执行，成功解决。感觉学到了许多。
* 响应式布局 
   * 之前虽然学习了响应式布局，也做过一些小项目和小测试，但没有做过整站的响应，这次过程中，从字体到布局，到每一种设备之下的平缓过渡，我都做得比较细，考虑比较周全，这才感觉是真正走进了响应式的设计。
   
###部分截图 
![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/1.PNG)

![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/2.PNG)

![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/3.PNG)

![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/4.PNG)

![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/5.PNG)

![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/6.PNG)

![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/7.PNG)

![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/8.PNG)

![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/9.PNG)

![image](https://github.com/aphasic/MyWebsite1/raw/master/screenshot/10.PNG)
