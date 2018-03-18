
CommonsChunkPlugin 研究项目 , 附加demo。

0.需预先安装 nodejs 和 yarn 环境

 运行 & 打包：

```
yarn

yarn dev

yarn build

打开 http://(ip):8083

```

webpack从升级到2.6升级到3.8, 没有什么惊喜,看不出有速度提升 ,仅对devServer配置做了少许改动,而且proxy接口的时候会不太稳定

CommonsChunkPlugin 及 包依赖再度研究:

新建的demo只有两个简单的页面, npm依赖为react, echarts等,
初次run dev 在7秒左右,之后的热更新在1秒以内,
build时间控制在15秒左右.
run dev 的home.js文件只有15kB,其他依赖已经整合到了common.js下,有886kB.
run build的home.js文件4.5kB,common.js只有1kB不到,因为全引到了cdn. 再也不用担心打包文件过大了.

echarts比较特殊,不会被整合到common里,加到externals无效,所以仅引用缓存即可.